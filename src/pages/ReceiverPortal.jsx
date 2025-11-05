import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, update, get } from "firebase/database";
import { database } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useRealtimeData } from "../hooks/useRealtimeData";
import ProductList from "../components/receiver/ProductList";
import { Radio } from "lucide-react";

export default function ReceiverPortal() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();
  const [isScanning, setIsScanning] = useState(false);

  // Real-time subscriptions
  const { data: allProducts } = useRealtimeData("products");
  const { data: detections } = useRealtimeData("warehouse/detections");
  const { data: scanners } = useRealtimeData("warehouse/scanners");
  // Keep a live view of the current scanner status (ESP32 writes here)
  const { data: currentStatus } = useRealtimeData("warehouse/current_status");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const myProducts =
    allProducts?.filter((p) => p.receiver_email === user?.email) || [];

  // Auto-sync product.status with warehouse/current_status updates coming from ESP32
  // This ensures receiver UI updates automatically when the ESP32 reports present/missing.
  // Inserted: convert currentStatus (array of { id: deviceName, present, last_seen, rssi })
  // into a map and update any products that changed state.
  // NOTE: we avoid changing products that are already marked 'received'.
  useEffect(() => {
    if (!currentStatus || currentStatus.length === 0 || !myProducts) return;

    const statusMap = new Map(currentStatus.map((s) => [s.id, s]));

    myProducts.forEach(async (product) => {
      try {
        if (!product || !product.device_name || product.status === "received")
          return;

        const deviceEntry = statusMap.get(product.device_name);
        // If no entry exists for the device, treat as missing (device not reporting)
        const newStatus =
          deviceEntry && deviceEntry.present ? "present" : "missing";

        if (newStatus !== product.status) {
          await updateProduct(product.id, {
            status: newStatus,
            updated_date: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Error syncing product status from current_status:", err);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus, allProducts, user]);

  const handleMarkReceived = async (product) => {
    await updateProduct(product.id, {
      status: "received",
      received_date: new Date().toISOString(),
    });
  };

  const simulateBluetoothVerification = async () => {
    setIsScanning(true);

    try {
      // 1. Trigger ESP32 Master to scan all slaves
      // Set trigger_scan flag in Firebase for ESP32 to detect
      const triggerRef = ref(database, "warehouse/scanner/trigger_scan");
      await update(triggerRef, {
        requested: true,
        requested_by: user.email,
        requested_at: new Date().toISOString(),
      });

      // Also update scanner status to active
      const scannerStatusRef = ref(database, "warehouse/scanner");
      await update(scannerStatusRef, {
        status: "scanning",
        last_seen: new Date().toISOString(),
      });

      // 2. Wait for ESP32 to complete scan (ESP32 scans all 3 slaves, takes ~15-20 seconds)
      // Check for new detections every 2 seconds, timeout after 30 seconds
      let scanComplete = false;
      let attempts = 0;
      const maxAttempts = 15; // 30 seconds total
      const scanStartTime = Date.now();

      while (!scanComplete && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempts++;

        // Check if new detections have been added (within last 30 seconds)
        const detectionsRef = ref(database, "warehouse/detections");
        const detectionsSnapshot = await get(detectionsRef);
        const allDetections = detectionsSnapshot.val();

        if (allDetections) {
          // Check for recent detections (within last 30 seconds)
          const recentDetections = Object.values(allDetections).filter(
            (detection) => {
              const detectionTime = detection.timestamp
                ? parseInt(detection.timestamp)
                : 0;
              const timeDiff = Date.now() - detectionTime;
              return timeDiff < 30000; // Within last 30 seconds
            }
          );

          if (recentDetections.length > 0) {
            scanComplete = true;
          }
        }
      }

      // 3. Get current status from warehouse/current_status (most reliable)
      const currentStatusRef = ref(database, "warehouse/current_status");
      const currentStatusSnapshot = await get(currentStatusRef);
      const currentStatus = currentStatusSnapshot.val() || {};

      // Also get recent detections for timestamp info
      const detectionsRef = ref(database, "warehouse/detections");
      const detectionsSnapshot = await get(detectionsRef);
      const allDetections = detectionsSnapshot.val() || {};

      // Extract detected device names from current_status
      const detectedDevices = new Set();
      Object.entries(currentStatus).forEach(([deviceName, status]) => {
        if (status.present === true) {
          detectedDevices.add(deviceName);
        }
      });

      // Create a map of device_name -> product for this receiver
      const receiverDeviceMap = new Map();
      myProducts.forEach((product) => {
        if (product.device_name) {
          receiverDeviceMap.set(product.device_name, product);
        }
      });

      // 4. Update product statuses based on detected slaves
      for (const product of myProducts) {
        if (product.status === "received") continue; // Skip already received products

        const deviceName = product.device_name;
        const isDetected = detectedDevices.has(deviceName);

        let newStatus;
        if (isDetected) {
          // Device is detected - check if it belongs to this receiver
          if (receiverDeviceMap.has(deviceName)) {
            newStatus = "present"; // ✅ Correct product detected
          } else {
            newStatus = "irrelevant"; // ⚠️ Detected but not for this receiver
          }
        } else {
          // Device not detected - if it's for this receiver, mark as missing
          if (product.receiver_email === user.email) {
            newStatus = "missing"; // ❌ Expected but not found
          } else {
            newStatus = "irrelevant"; // Not relevant to this receiver
          }
        }

        // Only update if status changed
        if (product.status !== newStatus) {
          await updateProduct(product.id, {
            status: newStatus,
            updated_date: new Date().toISOString(),
          });
        }
      }

      // 5. Reset trigger flag
      await update(triggerRef, { requested: false });
      await update(scannerStatusRef, { status: "online" });

      // Show results
      const presentCount = myProducts.filter(
        (p) => p.status === "present"
      ).length;
      const missingCount = myProducts.filter(
        (p) => p.status === "missing"
      ).length;
      const detectedCount = detectedDevices.size;

      alert(
        `Bluetooth verification complete!\n\nDetected Slaves: ${detectedCount}/3\nYour Packages:\n✓ ${presentCount} Present\n✗ ${missingCount} Missing`
      );
    } catch (error) {
      console.error("Verification error:", error);
      alert("Verification failed. Please try again.\nError: " + error.message);
    } finally {
      setIsScanning(false);
    }
  };

  const presentCount = myProducts.filter((p) => p.status === "present").length;
  const missingCount = myProducts.filter((p) => p.status === "missing").length;

  if (authLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Receiver Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            View and verify incoming packages
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Bluetooth Verification
          </h2>
          <p className="muted-text mb-4">
            Verify which packages are physically present using Bluetooth
            scanning. Master will scan all 3 slaves (ESP32_Slave1, ESP32_Slave2,
            ESP32_Slave3).
          </p>
          <div className="flex gap-4 mb-4">
            <span className="status-badge-present font-medium">
              ✓ {presentCount} Present
            </span>
            <span className="status-badge-missing font-medium">
              ✗ {missingCount} Missing
            </span>
          </div>
          {isScanning && (
            <div
              className="mb-4 p-3 card-rounded"
              style={{
                backgroundColor: "rgba(15,23,42,0.03)",
                borderRadius: 8,
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--color-primary)" }}
              >
                <div
                  className="animate-spin rounded-full h-4 w-4 border-b-2"
                  style={{ borderColor: "var(--color-primary)" }}
                ></div>
                <span className="text-sm font-medium">
                  Scanning for slaves... Please wait (up to 30 seconds)
                </span>
              </div>
            </div>
          )}
          <button
            onClick={simulateBluetoothVerification}
            disabled={isScanning}
            className="accent-btn px-6 py-3 rounded-lg disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
          >
            <Radio size={20} className={isScanning ? "animate-pulse" : ""} />
            {isScanning ? "Scanning..." : "Verify Bluetooth"}
          </button>
        </div>

        <ProductList
          products={myProducts}
          onMarkReceived={handleMarkReceived}
          currentUserEmail={user?.email}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { useRealtimeData } from "../hooks/useRealtimeData";
import ScannerStatus from "../components/warehouse/ScannerStatus";
import DetectionCards from "../components/warehouse/DetectionCards";
import DetectionHistory from "../components/warehouse/DetectionHistory";

export default function WarehouseTracker() {
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Real-time data subscriptions
  // Read scanner status directly from the correct Firebase path
  const { data: scanner, loading: scannersLoading } = useRealtimeData(
    "warehouse/scanner",
    { enabled: autoRefresh }
  );

  const { data: detections, loading: detectionsLoading } = useRealtimeData(
    "warehouse/detections",
    {
      limitToLast: 50,
      sortBy: "timestamp",
      sortDesc: true,
      enabled: autoRefresh,
    }
  );

  const { data: currentStatus } = useRealtimeData("warehouse/current_status", {
    enabled: autoRefresh,
  });

  const { data: products } = useRealtimeData("products", {
    enabled: autoRefresh,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Warehouse Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time BLE detection monitoring
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              autoRefresh
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700">
            <ScannerStatus scanner={scanner} loading={scannersLoading} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700">
            <DetectionCards detections={detections} products={products} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700">
            <DetectionHistory
              detections={detections}
              loading={detectionsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Package, Signal } from "lucide-react";
import { formatTimeSince } from "../../utils/formatters";
import StatusBadge from "../common/StatusBadge";

export default function DetectionCards({ detections, products }) {
  if (!detections || detections.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Package Detection Status
        </h2>
        <p className="text-gray-400 text-center py-8">
          No detections yet. Waiting for ESP32 scanner...
        </p>
      </div>
    );
  }

  const recentDetections = detections.slice(0, 20);
  const deviceMap = new Map();

  recentDetections.forEach((detection) => {
    if (detection.deviceName) {
      const existing = deviceMap.get(detection.deviceName);
      if (
        !existing ||
        new Date(detection.timestamp) > new Date(existing.timestamp)
      ) {
        deviceMap.set(detection.deviceName, detection);
      }
    }
  });

  const detectedDevices = Array.from(deviceMap.values());

  const getProductInfo = (deviceName) => {
    return products?.find((p) => p.device_name === deviceName);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Currently Detected Devices
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {detectedDevices.map((detection) => {
          const product = getProductInfo(detection.deviceName);
          return (
            <div
              key={detection.id || detection.deviceName}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="text-blue-400" size={20} />
                  <h3 className="font-semibold text-white">
                    {detection.deviceName}
                  </h3>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {product && (
                <div className="mb-3">
                  <p className="text-sm text-gray-300 mb-1">
                    {product.product_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    ID: {product.product_id || product.id}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={product.status} />
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Signal size={16} className="text-gray-400" />
                  <span>RSSI: {detection.rssi} dBm</span>
                </div>
                <div className="text-xs text-gray-400">
                  Detected {formatTimeSince(detection.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {detectedDevices.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No devices currently detected
        </p>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { Package, Truck, Warehouse } from "lucide-react";

export default function Home() {
  const portals = [
    {
      path: "/sender",
      title: "Sender Portal",
      description: "Create and track your shipments",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      path: "/receiver",
      title: "Receiver Portal",
      description: "View and verify incoming packages",
      icon: Truck,
      color: "bg-green-500",
    },
    {
      path: "/warehouse",
      title: "Warehouse Tracker",
      description: "Real-time BLE detection monitoring",
      icon: Warehouse,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            IoT Logistics Tracking System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time warehouse package tracking using ESP32 BLE beacons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.path}
                to={portal.path}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow transform hover:-translate-y-1 border border-gray-200"
              >
                <div
                  className={`${portal.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}
                >
                  <Icon className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-center mb-3 text-gray-900 dark:text-white">
                  {portal.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {portal.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Create Shipment
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Senders create shipments with ESP32 device assignments
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-semibold mb-2 dark:text-white">
                BLE Detection
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                ESP32 Master scanner detects beacons in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Verify & Receive
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Receivers verify packages and mark as received
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

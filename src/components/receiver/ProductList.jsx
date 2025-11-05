import { Package, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatDateTime } from "../../utils/formatters";
import StatusBadge from "../common/StatusBadge";

export default function ProductList({
  products,
  onMarkReceived,
  currentUserEmail,
}) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Incoming Products
        </h2>
        <p className="text-gray-400 text-center py-8">
          No products assigned to you
        </p>
      </div>
    );
  }

  // Filter to only show products for this receiver that are not irrelevant
  const filteredProducts = products.filter(
    (p) => p.receiver_email === currentUserEmail && p.status !== "irrelevant" // Don't show irrelevant packages
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Incoming Products
        </h2>
        <p className="text-gray-400 text-center py-8">
          No products assigned to you
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-gray-700/50">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Incoming Products
      </h2>
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const canMarkReceived =
            product.status === "present" && product.status !== "received";

          return (
            <div
              key={product.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                product.status === "received"
                  ? "bg-green-900/20 border-green-500/30"
                  : "bg-gray-800/30 border-gray-700/50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={20} className="text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                      {product.product_name}
                    </h3>
                    <StatusBadge status={product.status} />
                  </div>
                  <p className="text-sm text-gray-300 mb-1">
                    ID: {product.product_id || product.id}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    Device: {product.device_name}
                  </p>
                  <p className="text-sm text-gray-400">
                    From: {product.sender_name || product.sender_email}
                  </p>
                </div>
                {product.status === "present" && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-medium">Detected</span>
                  </div>
                )}
                {product.status === "missing" && (
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle size={20} />
                    <span className="text-sm font-medium">Not Found</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Shipped: {formatDateTime(product.shipment_date)}</span>
                </div>
                {product.received_date && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Calendar size={16} />
                    <span>
                      Received: {formatDateTime(product.received_date)}
                    </span>
                  </div>
                )}
              </div>

              {product.notes && (
                <div className="mb-3 pt-3 border-t border-gray-700/50">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-200">Notes:</span>{" "}
                    {product.notes}
                  </p>
                </div>
              )}

              {canMarkReceived && (
                <div className="pt-3 border-t border-gray-700/50">
                  <button
                    onClick={() => onMarkReceived(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <CheckCircle2 size={16} />
                    Mark as Received
                  </button>
                </div>
              )}

              {product.status === "received" && (
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 size={16} />
                    <span className="text-sm font-medium">
                      Package received
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

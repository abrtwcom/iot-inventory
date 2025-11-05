import { Package, Calendar, Mail, User } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';

export default function ShipmentList({ shipments, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!shipments || shipments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Shipments</h2>
        <p className="text-gray-500 text-center py-8">No shipments created yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">My Shipments</h2>
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold">{shipment.product_name}</h3>
                  <StatusBadge status={shipment.status} />
                </div>
                <p className="text-sm text-gray-600 mb-2">ID: {shipment.product_id || shipment.id}</p>
                <p className="text-sm text-gray-600 mb-2">Device: {shipment.device_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User size={16} />
                <span>To: {shipment.receiver_name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{shipment.receiver_email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>Shipped: {formatDateTime(shipment.shipment_date)}</span>
              </div>
              {shipment.received_date && (
                <div className="flex items-center gap-2 text-green-600">
                  <Calendar size={16} />
                  <span>Received: {formatDateTime(shipment.received_date)}</span>
                </div>
              )}
            </div>

            {shipment.notes && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {shipment.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


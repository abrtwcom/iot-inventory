import { useState } from "react";
import { Package, User, Mail, FileText } from "lucide-react";

export default function ShipmentForm({ onSubmit, currentUser }) {
  const [formData, setFormData] = useState({
    product_name: "",
    product_id: "",
    receiver_email: "",
    receiver_name: "",
    device_name: "ESP32_Slave1",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        product_name: "",
        product_id: "",
        receiver_email: "",
        receiver_name: "",
        device_name: "ESP32_Slave1",
        notes: "",
      });
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("Failed to create shipment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const deviceOptions = [
    "ESP32_Slave1",
    "ESP32_Slave2",
    "ESP32_Slave3",
    "ESP32_Slave4",
    "ESP32_Slave5",
  ];

  return (
    <div className="bg-blue-500 rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-xl font-semibold mb-6 text-white">
        Create New Shipment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
            <Package size={16} />
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/50"
            placeholder="e.g., Dell Laptop XPS 15"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
            <Package size={16} />
            Package ID
          </label>
          <input
            type="text"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/50"
            placeholder="e.g., PKG-001"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <User size={16} />
              Receiver Name
            </label>
            <input
              type="text"
              name="receiver_name"
              value={formData.receiver_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/50"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <Mail size={16} />
              Receiver Email
            </label>
            <input
              type="email"
              name="receiver_email"
              value={formData.receiver_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/50"
              placeholder="receiver@company.com"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
            <Package size={16} />
            Device Name (BLE Beacon)
          </label>
          <select
            name="device_name"
            value={formData.device_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
          >
            {deviceOptions.map((device) => (
              <option key={device} value={device}>
                {device}
              </option>
            ))}
          </select>
          <p className="text-xs text-white/70 mt-1">
            Select the ESP32 device attached to this package
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
            <FileText size={16} />
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/50"
            placeholder="Handle with care - fragile electronics"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {submitting ? "Creating..." : "Create Shipment"}
        </button>
      </form>
    </div>
  );
}

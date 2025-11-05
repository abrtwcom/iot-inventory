import React from "react";
import StatusBadge from "../components/common/StatusBadge";

const Orders = () => {
  const orders = [
    {
      id: "#783456901",
      driver: "Mia Sanchez",
      pickup: "Madrid, ES",
      delivery: "Lisbon, PT",
      expires: "08 May 2025",
      status: "Picked up",
    },
    {
      id: "#783456902",
      driver: "John Becker",
      pickup: "New York, US",
      delivery: "Toronto, CA",
      expires: "29 Jun 2025",
      status: "In transit",
    },
    {
      id: "#783456903",
      driver: "Mia Sanchez",
      pickup: "Paris, FR",
      delivery: "Berlin, DE",
      expires: "15 Jul 2025",
      status: "Picked up",
    },
    // Add more mock orders if needed
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              {[
                "Order ID",
                "Order assigned to",
                "Pickup address",
                "Delivery address",
                "Expire at",
                "Status",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="p-4 text-sm font-medium text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.driver}</td>
                <td className="p-4">{order.pickup}</td>
                <td className="p-4">{order.delivery}</td>
                <td className="p-4 text-gray-400">{order.expires}</td>
                <td className="p-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="p-4">
                  <button className="text-blue-400 hover:underline text-sm">
                    See more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

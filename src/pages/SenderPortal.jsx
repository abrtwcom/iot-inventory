import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useRealtimeData } from "../hooks/useRealtimeData";
import ShipmentForm from "../components/sender/ShipmentForm";
import ShipmentList from "../components/sender/ShipmentList";

export default function SenderPortal() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { createProduct } = useProducts();
  const [shipments, setShipments] = useState([]);

  // Get all products and filter by sender
  const { data: allProducts } = useRealtimeData("products");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && allProducts) {
      const myShipments = allProducts.filter(
        (p) => p.sender_email === user.email
      );
      // Sort by shipment_date descending
      myShipments.sort(
        (a, b) =>
          new Date(b.shipment_date || b.created_date) -
          new Date(a.shipment_date || a.created_date)
      );
      setShipments(myShipments);
    }
  }, [user, allProducts]);

  const handleCreateShipment = async (formData) => {
    const shipmentData = {
      ...formData,
      sender_email: user.email,
      sender_name: user.full_name || user.email,
      status: "sent",
      shipment_date: new Date().toISOString(),
      created_by: user.email,
    };

    await createProduct(shipmentData);
    alert("Shipment created successfully!");
  };

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
            Sender Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Create and track your shipments
          </p>
        </div>

        <div className="space-y-8">
          <ShipmentForm onSubmit={handleCreateShipment} currentUser={user} />
          <ShipmentList shipments={shipments} />
        </div>
      </div>
    </div>
  );
}

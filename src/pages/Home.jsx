import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  Warehouse,
  Bluetooth,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Smartphone,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const portals = [
    {
      path: "/sender",
      title: "Sender Portal",
      description: "Create and track your shipments",
      icon: Package,
      color: "#3b82f6",
      features: ["Real-time tracking", "ESP32 integration", "Status updates"],
    },
    {
      path: "/receiver",
      title: "Receiver Portal",
      description: "View and verify incoming packages",
      icon: Truck,
      color: "#22c55e",
      features: ["Bluetooth verification", "Package validation", "Secure receipt"],
    },
    {
      path: "/warehouse",
      title: "Warehouse Tracker",
      description: "Real-time BLE detection monitoring",
      icon: Warehouse,
      color: "#8b5cf6",
      features: ["Live monitoring", "Detection history", "System status"],
    },
  ];

  const stats = [
    { number: "247", label: "Active Shipments", icon: Package },
    { number: "89", label: "BLE Devices", icon: Bluetooth },
    { number: "1,203", label: "Verified Packages", icon: Shield },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Shipment",
      description:
        "Senders create shipments with ESP32 device assignments and detailed package information for seamless tracking.",
      icon: Smartphone,
    },
    {
      step: "2",
      title: "BLE Detection",
      description:
        "ESP32 Master scanner continuously detects beacons in real-time, providing instant warehouse visibility.",
      icon: BarChart3,
    },
    {
      step: "3",
      title: "Verify & Receive",
      description:
        "Receivers verify packages through Bluetooth scanning and mark them as received with secure confirmation.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="page-container home-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="powered-by">
          <Zap size={16} />
          <span>Powered by ESP32 BLE Technology</span>
        </div>
        <h1 className="hero-title">
          <span>WareHub</span>
          <br />
          Smart Inventory & Logistics Platform
        </h1>
        <p className="hero-description">
          Revolutionize your warehouse inventory operations with real-time package
          tracking using advanced ESP32 BLE beacons and seamless digital
          verification.
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="stats-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="icon-wrapper mx-auto mb-3"
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "0.75rem",
                  background: "var(--color-primary)",
                }}
              >
                <Icon size={20} />
              </div>
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Portal Cards */}
      <div className="portal-grid">
        {portals.map((portal, index) => {
          const Icon = portal.icon;
          return (
            <Link
              key={portal.path}
              to={portal.path}
              className="portal-card"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className="icon-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${portal.color}, ${portal.color}dd)`,
                  boxShadow: `0 8px 25px ${portal.color}40`,
                }}
              >
                <Icon size={24} />
              </div>
              <h3>{portal.title}</h3>
              <p>{portal.description}</p>
              <div className="portal-features">
                <ul className="space-y-2">
                  {portal.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <CheckCircle size={14} style={{ color: portal.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="portal-link"
                style={{ color: portal.color }}
              >
                Explore <ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* How It Works Section */}
      <div className="card how-it-works-card">
        <h2 className="section-title" style={{ textAlign: "center", justifyContent: "center" }}>
          How It Works
        </h2>
        <p
          className="text-center mb-8 how-it-works-description"
          style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 2rem" }}
        >
          Our streamlined process ensures secure, efficient package tracking from
          creation to delivery verification.
        </p>
        <div className="steps-grid">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="step-card">
                <div className="step-number">{step.step}</div>
                <div
                  className="icon-wrapper mx-auto mb-4"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.75rem",
                    background: "var(--color-primary)",
                  }}
                >
                  <Icon size={18} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2024 WareHub. All rights reserved.</p>
      </div>
    </div>
  );
}


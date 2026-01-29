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
    <div className="page-container home-container min-h-screen">

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fadeIn">
            <Zap size={14} className="fill-current" />
            <span>Powered by ESP32 BLE Technology</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-slideIn" style={{ lineHeight: 1.1 }}>
            <span className="block text-white">WareHub</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Smart Inventory & Logistics
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Revolutionize your warehouse operations with real-time package tracking,
            instant verification, and seamless BLE beacon integration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Link to="/sender" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/warehouse" className="btn-secondary px-8 py-4 text-lg">
              Live Demo
            </Link>
          </div>
        </div>

        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stats-card group hover:scale-[1.02] transition-transform"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <Icon size={24} className="text-blue-400" />
                    </div>
                  </div>
                  <div className="number mb-1">{stat.number}</div>
                  <div className="label font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access Portals */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Access Portals</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dedicated interfaces for every role in your logistics chain.
              Manage shipments, track inventory, and verify deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((portal, index) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.path}
                  to={portal.path}
                  className="portal-card group relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon size={120} />
                  </div>

                  <div
                    className="icon-wrapper mb-6 shadow-lg shadow-blue-500/20"
                    style={{
                      background: `linear-gradient(135deg, ${portal.color}, ${portal.color}dd)`,
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {portal.title}
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>

                  <p className="mb-6 leading-relaxed">{portal.description}</p>

                  <div className="portal-features border-t border-white/10 pt-4 mt-auto">
                    <ul className="space-y-3">
                      {portal.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-400"
                        >
                          <div className="p-1 rounded-full bg-white/5">
                            <CheckCircle size={10} style={{ color: portal.color }} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our streamlined process ensures secure, efficient package tracking
              from creation to delivery verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="step-card group">
                  <div className="step-number">{step.step}</div>
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} className="text-blue-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">{step.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WareHub. Powered by Antigravity.
          </p>
        </div>
      </footer>
    </div>
  );
}


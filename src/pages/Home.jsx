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
      <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-medium mb-8 animate-fadeIn">
            <Zap size={14} className="fill-current" />
            <span>Powered by ESP32 BLE Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 animate-slideIn" style={{ lineHeight: 1.1 }}>
            <span className="block text-white">WareHub</span>
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Smart Inventory & Logistics
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Revolutionize your warehouse operations with real-time package tracking,
            instant verification, and seamless BLE beacon integration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Link to="/sender" className="btn-primary flex items-center gap-2 px-10 py-5 text-xl font-semibold shadow-blue-900/20">
              Get Started <ArrowRight size={24} />
            </Link>
            <Link to="/warehouse" className="btn-secondary px-10 py-5 text-lg">
              Live Demo
            </Link>
          </div>
        </div>

        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
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
                    <div className="p-3 rounded-xl bg-blue-500/200/10 group-hover:bg-blue-500/200/20 transition-colors">
                      <Icon size={28} className="text-blue-400" />
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
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Access Portals</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
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

                  <h3 className="text-xl mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2 font-semibold">
                    {portal.title}
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>

                  <p className="mb-6 leading-relaxed text-gray-300">{portal.description}</p>

                  <div className="portal-features border-t border-white/10 pt-4 mt-auto">
                    <ul className="space-y-3">
                      {portal.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <div className="p-1 rounded-full bg-blue-500/20">
                            <CheckCircle size={12} style={{ color: portal.color }} />
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
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
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
                    <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={32} className="text-blue-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">{step.title}</h4>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose WareHub?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Built with cutting-edge IoT technology to give you complete control
              over your warehouse operations and logistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card hover:shadow-xl">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Monitor package locations instantly with ESP32 BLE beacons. Get live updates
                as shipments move through your warehouse ecosystem.
              </p>
            </div>

            <div className="card hover:shadow-xl">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-purple-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Verification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bluetooth-based package verification ensures only authorized receivers can
                confirm deliveries, reducing theft and errors.
              </p>
            </div>

            <div className="card hover:shadow-xl">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Bluetooth className="text-green-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ESP32 Powered</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Leverages low-power ESP32 microcontrollers for cost-effective,
                scalable tracking without expensive infrastructure.
              </p>
            </div>

            <div className="card hover:shadow-xl">
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="text-orange-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive insights into shipment patterns, delivery times, and
                warehouse efficiency metrics at your fingertips.
              </p>
            </div>

            <div className="card hover:shadow-xl">
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="text-pink-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access your dashboard, create shipments, and verify packages
                from any device, anywhere, anytime.
              </p>
            </div>

            <div className="card hover:shadow-xl">
              <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Integration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simple API integration with your existing systems. Get started in
                minutes with our straightforward setup process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WareHub. Powered by Antigravity.
          </p>
        </div>
      </footer>
    </div>
  );
}


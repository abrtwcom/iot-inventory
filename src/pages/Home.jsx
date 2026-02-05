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
  Activity
} from "lucide-react";

export default function Home() {
  const portals = [
    {
      path: "/sender",
      title: "Sender Portal",
      description: "Create and track your shipments",
      icon: Package,
      color: "from-blue-500 to-blue-600",
      features: ["Real-time tracking", "ESP32 integration", "Status updates"],
    },
    {
      path: "/receiver",
      title: "Receiver Portal",
      description: "View and verify incoming packages",
      icon: Truck,
      color: "from-emerald-500 to-emerald-600",
      features: ["Bluetooth verification", "Package validation", "Secure receipt"],
    },
    {
      path: "/warehouse",
      title: "Warehouse Tracker",
      description: "Real-time BLE detection monitoring",
      icon: Warehouse,
      color: "from-violet-500 to-violet-600",
      features: ["Live monitoring", "Detection history", "System status"],
    },
  ];

  const stats = [
    { number: "247", label: "Active Shipments", icon: Package, change: "+12%", color: "text-blue-400" },
    { number: "89", label: "BLE Devices", icon: Bluetooth, change: "Stable", color: "text-emerald-400" },
    { number: "1,203", label: "Verified Packages", icon: Shield, change: "+5%", color: "text-purple-400" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">

      {/* Hero Header Section - Dashboard Style */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Warehouse size={400} />
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <Zap size={14} className="fill-current" />
              <span>Powered by ESP32 BLE Technology</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Smart Inventory & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Logistics Automation
              </span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Revolutionize your warehouse operations with real-time package tracking,
              instant verification, and seamless BLE beacon integration.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/sender" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 group">
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/warehouse" className="px-8 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all flex items-center gap-2">
                <Activity size={20} /> Live Demo
              </Link>
            </div>
          </div>

          {/* Abstract decorative graphic or dashboard preview */}
          <div className="hidden lg:block relative w-96 h-80">
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl rotate-3 border border-white/5 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl -rotate-3 border border-white/5 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-slate-800/80 rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col gap-4">
              {/* Fake UI elements for preview */}
              <div className="h-24 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Package size={24} />
                </div>
                <div>
                  <div className="h-3 w-24 bg-slate-700 rounded mb-2"></div>
                  <div className="h-2 w-32 bg-slate-800 rounded"></div>
                </div>
              </div>
              <div className="h-24 rounded-lg bg-slate-900/50 border border-white/5 p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Truck size={24} />
                </div>
                <div>
                  <div className="h-3 w-24 bg-slate-700 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-slate-800 rounded"></div>
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-slate-800/40 border border-white/5 hover:border-white/10 hover:bg-slate-800/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-900/50 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className={stat.color} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.number}</div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* Portals Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Access Portals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.path}
                to={portal.path}
                className="group relative overflow-hidden rounded-2xl bg-slate-800 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20"
              >
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${portal.color}`}></div>

                <div className="p-6 md:p-8 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                    {portal.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {portal.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                        <CheckCircle size={14} className="text-blue-500/50 group-hover:text-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                    Enter Portal <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why Choose Section - Kept minimal for footer context */}
      <section className="py-12 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Why Choose WareHub?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built for modern logistics with real-time tracking and verification.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Real-Time Tracking", icon: Zap, color: "text-yellow-400" },
            { title: "Secure Verification", icon: Shield, color: "text-purple-400" },
            { title: "ESP32 Powered", icon: Bluetooth, color: "text-blue-400" },
            { title: "Mobile Friendly", icon: Smartphone, color: "text-pink-400" }
          ].map((feat, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-center gap-3">
              <feat.icon className={feat.color} size={20} />
              <span className="font-medium text-slate-200">{feat.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 mt-auto text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} WareHub. Powered by Antigravity.</p>
      </footer>
    </div>
  );
}

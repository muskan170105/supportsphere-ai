import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  BookOpen,
  FileText,
  Settings,
  Bot,
  Database,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col min-h-screen">

      {/* Logo */}

      <div className="px-6 py-7 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">

            <Bot className="text-white" size={24} />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">
              SupportSphere AI
            </h1>

            <p className="text-slate-400 text-sm">
              Enterprise Support Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-6">

        <SidebarHeading title="MAIN" />

        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          title="Dashboard"
        />

        <SidebarItem
          to="/live-chat"
          icon={<MessageSquare size={20} />}
          title="Live Chat"
        />

        <SidebarItem
          to="/analytics"
          icon={<BarChart3 size={20} />}
          title="Analytics"
        />

        <SidebarHeading title="KNOWLEDGE" />

        <SidebarItem
          to="/knowledge-base"
          icon={<BookOpen size={20} />}
          title="Knowledge Base"
        />

        <SidebarItem
          to="/reports"
          icon={<FileText size={20} />}
          title="Reports"
        />

        <SidebarHeading title="SYSTEM" />

        <SidebarItem
          to="/settings"
          icon={<Settings size={20} />}
          title="Settings"
        />

      </div>

      {/* AI Status */}

      <div className="border-t border-slate-800 p-5">

        <h3 className="text-xs font-semibold tracking-widest text-slate-500 mb-4">
          AI SERVICES
        </h3>

        <StatusItem
          icon={<BrainCircuit size={16} />}
          title="Planner"
        />

        <StatusItem
          icon={<Sparkles size={16} />}
          title="Retriever"
        />

        <StatusItem
          icon={<Bot size={16} />}
          title="Gemini"
        />

        <StatusItem
          icon={<Database size={16} />}
          title="Vector DB"
        />

        <div className="mt-5 rounded-xl bg-slate-900 border border-slate-800 px-4 py-3">

          <p className="text-xs text-slate-400">

            Version

          </p>

          <p className="text-white font-semibold">

            Enterprise v1.0

          </p>

        </div>

      </div>

    </aside>
  );
}

function SidebarHeading({ title }) {
  return (
    <p className="text-xs font-semibold tracking-widest text-slate-500 mb-3 mt-6">
      {title}
    </p>
  );
}

function SidebarItem({
  icon,
  title,
  to,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        mb-2
        transition-all
        duration-200

        ${
          isActive
            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
            : "text-slate-300 hover:bg-slate-900 hover:text-white"
        }
        `
      }
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </NavLink>
  );
}

function StatusItem({ icon, title }) {
  return (
    <div className="flex items-center justify-between py-2">

      <div className="flex items-center gap-3 text-slate-300">

        {icon}

        <span className="text-sm">
          {title}
        </span>

      </div>

      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>

    </div>
  );
}

export default Sidebar;
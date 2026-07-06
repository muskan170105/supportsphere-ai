import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  BookOpen,
  FileText,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-cyan-400">
          SupportSphere AI
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          AI Support Platform
        </p>

      </div>

      {/* Navigation */}

      <nav className="mt-6 px-4">

        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          title="Dashboard"
        />

        <SidebarItem
          icon={<MessageSquare size={20} />}
          title="Live Chat"
        />

        <SidebarItem
          icon={<BarChart3 size={20} />}
          title="Analytics"
        />

        <SidebarItem
          icon={<BookOpen size={20} />}
          title="Knowledge Base"
        />

        <SidebarItem
          icon={<FileText size={20} />}
          title="Reports"
        />

        <SidebarItem
          icon={<Settings size={20} />}
          title="Settings"
        />

      </nav>

    </aside>
  );
}

function SidebarItem({ icon, title }) {
  return (
    <button
      className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-slate-300
        hover:bg-slate-800
        hover:text-white
        transition
        mb-2
      "
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>

    </button>
  );
}

export default Sidebar;
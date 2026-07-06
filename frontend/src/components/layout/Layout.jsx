import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Current Page */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
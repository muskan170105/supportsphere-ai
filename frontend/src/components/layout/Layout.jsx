import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex flex-1 flex-col min-w-0">

        <Topbar />

        {/* Workspace */}

        <main className="flex-1 overflow-auto bg-slate-100">

          <div className="p-8 max-w-[1700px] mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Layout;
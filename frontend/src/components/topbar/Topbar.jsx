import { Search, Bell, CircleUserRound } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Search Bar */}
      <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 w-[420px]">

        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search tickets, customers, orders..."
          className="
            bg-transparent
            outline-none
            text-white
            placeholder:text-slate-400
            ml-3
            w-full
          "
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell
            size={22}
            className="text-slate-300"
          />

          <span
            className="
              absolute
              -top-2
              -right-2
              w-5
              h-5
              rounded-full
              bg-red-500
              text-xs
              flex
              items-center
              justify-center
            "
          >
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <CircleUserRound
            size={34}
            className="text-cyan-400"
          />

          <div>

            <p className="text-white font-medium">
              Admin
            </p>

            <p className="text-slate-400 text-sm">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;
import {
  Search,
  Bell,
  CircleUserRound,
  Cpu,
  ShieldCheck,
} from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Search */}

      <div className="flex items-center bg-slate-100 rounded-xl px-4 py-3 w-[430px] shadow-sm">

        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          type="text"
          placeholder="Search conversations, customers, orders..."
          className="
            ml-3
            w-full
            bg-transparent
            outline-none
            text-slate-700
            placeholder:text-slate-400
          "
        />

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">

        {/* Environment */}

        <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200">

          <ShieldCheck
            size={18}
            className="text-indigo-600"
          />

          <span className="text-sm font-semibold text-indigo-700">
            Production
          </span>

        </div>

        {/* AI Status */}

        <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200">

          <Cpu
            size={17}
            className="text-emerald-600"
          />

          <span className="text-sm font-semibold text-emerald-700">
            AI Online
          </span>

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

        </div>

        {/* Notifications */}

        <button
          className="
            relative
            w-11
            h-11
            rounded-xl
            bg-slate-100
            hover:bg-slate-200
            transition
            flex
            items-center
            justify-center
          "
        >

          <Bell
            size={20}
            className="text-slate-700"
          />

          <span
            className="
              absolute
              top-2
              right-2
              w-2.5
              h-2.5
              rounded-full
              bg-red-500
            "
          />

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 pl-2">

          <div className="w-11 h-11 rounded-full bg-cyan-100 flex items-center justify-center">

            <CircleUserRound
              size={28}
              className="text-cyan-700"
            />

          </div>

          <div>

            <p className="font-semibold text-slate-800">
              Muskan
            </p>

            <p className="text-sm text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;
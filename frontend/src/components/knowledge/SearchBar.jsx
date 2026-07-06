import { Search, Filter } from "lucide-react";

function SearchBar() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search documents..."
            className="
              w-full
              pl-11
              pr-4
              py-3
              rounded-xl
              border
              border-slate-300
              outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-100
              transition
            "
          />

        </div>

        {/* Filter */}

        <button
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
          "
        >

          <Filter size={18} />

          Filter

        </button>

      </div>

    </div>
  );
}

export default SearchBar;
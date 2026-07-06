import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

function DashboardCard({
  title,
  value,
  change,
  positive = true,
  suffix = "",
  icon,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-6
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* Top */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

        </div>

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-cyan-50
            flex
            items-center
            justify-center
            text-cyan-600
          "
        >
          {icon}
        </div>

      </div>

      {/* Value */}

      <h2 className="mt-6 text-4xl font-bold text-slate-900">

        {value}

        {suffix}

      </h2>

      {/* Footer */}

      <div className="flex items-center justify-between mt-6">

        <div
          className={`
            flex
            items-center
            gap-1
            text-sm
            font-semibold
            ${
              positive
                ? "text-emerald-600"
                : "text-red-500"
            }
          `}
        >
          {positive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {change}

        </div>

        <span className="text-xs text-slate-400">

          vs last week

        </span>

      </div>

    </div>
  );
}

export default DashboardCard;
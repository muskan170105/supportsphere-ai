import {
  UserCircle2,
  Circle,
} from "lucide-react";

function ConversationCard({
  name,
  message,
  status,
  time,
}) {
  const statusColor = {
    Open: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Escalated: "bg-red-100 text-red-700",
    Closed: "bg-slate-200 text-slate-700",
  };

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-4
        transition-all
        duration-300
        hover:border-cyan-300
        hover:shadow-lg
      "
    >
      {/* Top */}

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <div className="relative">

            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">

              <UserCircle2
                size={30}
                className="text-cyan-700"
              />

            </div>

            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {name}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Premium Customer
            </p>

          </div>

        </div>

        <span className="text-xs text-slate-400">
          {time}
        </span>

      </div>

      {/* Message */}

      <p className="text-sm text-slate-600 mt-4 line-clamp-2">
        {message}
      </p>

      {/* Bottom */}

      <div className="flex items-center justify-between mt-5">

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${
              statusColor[status] ||
              "bg-cyan-100 text-cyan-700"
            }
          `}
        >
          {status}
        </span>

        <div className="flex items-center gap-2 text-emerald-600">

          <Circle
            size={10}
            fill="currentColor"
          />

          <span className="text-xs font-medium">
            Live
          </span>

        </div>

      </div>

    </div>
  );
}

export default ConversationCard;
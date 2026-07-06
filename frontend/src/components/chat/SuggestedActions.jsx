import {
  Package,
  RotateCcw,
  UserRoundCog,
  KeyRound,
} from "lucide-react";

function SuggestedActions({ actions }) {
  const iconMap = {
    "Track Order": <Package size={16} />,
    Refund: <RotateCcw size={16} />,
    Escalate: <UserRoundCog size={16} />,
    "Reset Password": <KeyRound size={16} />,
  };

  return (
    <div className="bg-white border-t border-slate-200 px-6 py-5">

      <div className="flex items-center justify-between mb-4">

        <div>

          <h3 className="text-sm font-semibold text-slate-900">
            AI Suggested Actions
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            One-click actions recommended by the AI assistant
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-3">

        {actions.map((action, index) => (

          <button
            key={index}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-slate-700
              text-sm
              font-medium
              hover:bg-cyan-50
              hover:border-cyan-300
              hover:text-cyan-700
              transition-all
              duration-200
            "
          >
            {iconMap[action]}

            {action}

          </button>

        ))}

      </div>

    </div>
  );
}

export default SuggestedActions;
import {
  Bot,
  User,
} from "lucide-react";

function MessageBubble({
  sender,
  message,
}) {
  const isAI = sender === "AI";

  return (
    <div
      className={`flex ${
        isAI
          ? "justify-start"
          : "justify-end"
      } mb-6`}
    >
      <div
        className={`flex items-end gap-3 max-w-[78%] ${
          isAI
            ? ""
            : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isAI
              ? "bg-cyan-100"
              : "bg-slate-200"
          }`}
        >
          {isAI ? (
            <Bot
              size={20}
              className="text-cyan-700"
            />
          ) : (
            <User
              size={18}
              className="text-slate-700"
            />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            isAI
              ? "bg-white border border-slate-200 text-slate-800"
              : "bg-cyan-600 text-white"
          }`}
        >
          <div className="flex items-center justify-between gap-6 mb-2">

            <span
              className={`font-semibold text-sm ${
                isAI
                  ? "text-cyan-700"
                  : "text-cyan-100"
              }`}
            >
              {isAI
                ? "SupportSphere AI"
                : "Customer"}
            </span>

            <span
              className={`text-xs ${
                isAI
                  ? "text-slate-400"
                  : "text-cyan-100"
              }`}
            >
              Just now
            </span>

          </div>

          <p className="leading-7 whitespace-pre-wrap">
            {message}
          </p>

        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
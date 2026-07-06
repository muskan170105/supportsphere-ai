import { SendHorizontal, Sparkles } from "lucide-react";

function ChatInput({
  input,
  setInput,
  onSend,
}) {
  return (
    <div className="bg-white border-t border-slate-200 px-6 py-5 rounded-b-2xl">

      <div className="flex items-center gap-4">

        {/* AI Badge */}

        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-50 border border-cyan-200">

          <Sparkles
            size={16}
            className="text-cyan-600"
          />

          <span className="text-sm font-medium text-cyan-700">
            AI Assistant
          </span>

        </div>

        {/* Input */}

        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          placeholder="Ask SupportSphere AI to assist the customer..."
          className="
            flex-1
            bg-slate-100
            border
            border-slate-200
            rounded-xl
            px-5
            py-3
            text-slate-800
            placeholder:text-slate-400
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            focus:border-cyan-500
            transition
          "
        />

        {/* Send */}

        <button
          onClick={onSend}
          className="
            flex
            items-center
            gap-2
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition-all
            duration-200
            hover:shadow-lg
            hover:shadow-cyan-500/25
          "
        >

          <SendHorizontal size={18} />

          Send

        </button>

      </div>

      <div className="mt-3 text-xs text-slate-500 flex justify-between">

        <span>
          Press <strong>Enter</strong> to send
        </span>

        <span>
          Powered by SupportSphere AI
        </span>

      </div>

    </div>
  );
}

export default ChatInput;
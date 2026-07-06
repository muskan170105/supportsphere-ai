function ChatInput() {
  return (
    <div className="border-t border-slate-800 p-5">

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Type your message..."
          className="
            flex-1
            bg-slate-800
            rounded-xl
            px-4
            py-3
            text-white
            outline-none
          "
        />

        <button
          className="
            bg-cyan-600
            hover:bg-cyan-700
            px-6
            rounded-xl
            transition
          "
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatInput;
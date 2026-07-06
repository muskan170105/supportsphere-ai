function ChatHeader({ conversation }) {
  return (
    <div className="border-b border-slate-800 p-5">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {conversation.name}
          </h2>

          <p className="text-sm text-green-400 mt-1">
            ● {conversation.status}
          </p>

        </div>

        <div className="text-slate-400 text-sm">
          {conversation.time}
        </div>

      </div>

    </div>
  );
}

export default ChatHeader;
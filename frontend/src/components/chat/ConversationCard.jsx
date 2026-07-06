function ConversationCard({
  name,
  message,
  status,
  time,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:bg-slate-800 transition cursor-pointer">

      <div className="flex justify-between items-center">

        <h3 className="text-white font-semibold">
          {name}
        </h3>

        <span className="text-xs text-slate-400">
          {time}
        </span>

      </div>

      <p className="text-slate-400 text-sm mt-2">
        {message}
      </p>

      <span className="inline-block mt-3 text-xs bg-cyan-600 px-2 py-1 rounded-full">
        {status}
      </span>

    </div>
  );
}

export default ConversationCard;
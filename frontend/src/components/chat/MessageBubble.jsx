function MessageBubble({
  sender,
  message,
}) {

  const isAI = sender === "AI";

  return (
    <div
      className={`flex ${
        isAI
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`
          max-w-md
          px-5
          py-3
          rounded-2xl
          ${
            isAI
              ? "bg-cyan-600 text-white"
              : "bg-slate-800 text-white"
          }
        `}
      >

        <p className="text-sm font-semibold mb-2">
          {sender}
        </p>

        <p>
          {message}
        </p>

      </div>

    </div>
  );
}

export default MessageBubble;
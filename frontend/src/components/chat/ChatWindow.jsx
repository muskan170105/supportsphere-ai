import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import SuggestedActions from "./SuggestedActions";
import ChatInput from "./ChatInput";

function ChatWindow({ conversation }) {
  if (!conversation) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 h-full flex items-center justify-center">
        <h2 className="text-slate-500 text-xl">
          Select a conversation
        </h2>
      </div>
    );
  }

  const messages = [
    {
      sender: "Customer",
      message: conversation.message,
    },
    {
      sender: "AI",
      message:
        "I understand your concern. Let me check your order details and assist you.",
    },
  ];

  const actions = [
    "Track Order",
    "Refund",
    "Escalate",
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 h-full flex flex-col">

      <ChatHeader conversation={conversation} />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">

        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
          />
        ))}

      </div>

      <SuggestedActions actions={actions} />

      <ChatInput />

    </div>
  );
}

export default ChatWindow;
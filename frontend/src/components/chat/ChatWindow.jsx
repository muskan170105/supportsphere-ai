import { useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import SuggestedActions from "./SuggestedActions";
import ChatInput from "./ChatInput";

function ChatWindow({
  conversation,
  messages,
  loading,
  onSendMessage,
}) {

  const [input, setInput] = useState("");

  if (!conversation) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 h-full flex items-center justify-center">
        <h2 className="text-slate-500 text-xl">
          Select a conversation
        </h2>
      </div>
    );
  }

  function handleSend() {

    if (!input.trim()) return;

    onSendMessage(input);

    setInput("");

  }

  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 h-full flex flex-col">

      <ChatHeader conversation={conversation} />

      {/* Messages */}

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">

        {messages.map((msg, index) => (

          <MessageBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
          />

        ))}

        {loading && (

          <div className="text-cyan-400">

            AI is thinking...

          </div>

        )}

      </div>

      <SuggestedActions
        actions={[
          "Track Order",
          "Refund",
          "Escalate",
        ]}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />

    </div>

  );

}

export default ChatWindow;
import { useRef, useState, useEffect } from "react";

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

  const bottomRef = useRef(null);

  // ---------------------------------------------
  // Auto Scroll
  // ---------------------------------------------

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);



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

    if (!input.trim())
      return;

    onSendMessage(input);

    setInput("");

  }



  return (

    <div className="bg-slate-900 rounded-2xl border border-slate-800 h-full flex flex-col">

      <ChatHeader conversation={conversation} />



      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {

          messages.length === 0 && (

            <div className="flex flex-col items-center justify-center h-full text-center">

              <h2 className="text-3xl font-bold text-white">

                Welcome to SupportSphere AI

              </h2>

              <p className="mt-3 text-slate-400 max-w-md">

                Start a conversation or choose one of the
                suggested actions below.

              </p>

            </div>

          )

        }



        {

          messages.map((message, index) => (

            <MessageBubble

                key={index}

                sender={message.sender}

                message={message.message}

                confidence={message.confidence}

                confidenceLevel={message.confidenceLevel}

                confidenceReason={message.confidenceReason}

                sources={message.sources}

            />
          ))

        }



        {

          loading && (

            <div className="flex items-center gap-3 text-cyan-400">

              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />

              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-150" />

              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-300" />

              <span className="ml-2">

                SupportSphere AI is thinking...

              </span>

            </div>

          )

        }

        <div ref={bottomRef} />

      </div>



      <SuggestedActions

        actions={[

          "Track Order",

          "Refund",

          "Reset Password",

          "Shipping Status",

        ]}

        onSelect={onSendMessage}

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
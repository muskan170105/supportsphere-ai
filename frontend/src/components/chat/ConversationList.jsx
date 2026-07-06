import {
  MessageCircle,
  Circle,
} from "lucide-react";

import ConversationCard from "./ConversationCard";

function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Live Conversations
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Active customer support sessions
          </p>

        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl">

          <Circle
            size={10}
            fill="currentColor"
          />

          <span className="text-sm font-semibold">
            {conversations.length} Active
          </span>

        </div>

      </div>

      {/* Conversations */}

      <div className="p-4 space-y-3 max-h-[720px] overflow-y-auto">

        {conversations.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20">

            <MessageCircle
              size={42}
              className="text-slate-300"
            />

            <p className="mt-4 text-slate-500">
              No active conversations
            </p>

          </div>

        ) : (

          conversations.map((conversation) => (

            <div
              key={conversation.id}
              onClick={() =>
                setSelectedConversation(conversation)
              }
              className={`
                cursor-pointer
                rounded-2xl
                transition-all
                duration-300

                ${
                  selectedConversation?.id ===
                  conversation.id
                    ? "ring-2 ring-cyan-500 shadow-md"
                    : "hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >

              <ConversationCard
                name={conversation.name}
                message={conversation.last_message}
                status={conversation.status}
                time={conversation.time}
              />

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ConversationList;
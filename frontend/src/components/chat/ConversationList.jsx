import ConversationCard from "./ConversationCard";

const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    message: "My order #12345 hasn't arrived.",
    status: "AI Handling",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Priya Verma",
    message: "I want to return my product.",
    status: "Open",
    time: "5m ago",
  },
  {
    id: 3,
    name: "Amit Kumar",
    message: "Payment failed but amount deducted.",
    status: "Escalated",
    time: "8m ago",
  },
];

function ConversationList({
  selectedConversation,
  setSelectedConversation,
}) {
  return (
    <div className="bg-slate-950 rounded-2xl p-5">

      {/* Heading */}
      <h2 className="text-xl font-bold text-white mb-5">
        Live Conversations
      </h2>

      {/* Conversation Cards */}
      <div className="space-y-4">

        {conversations.map((conversation) => (

          <div
            key={conversation.id}
            onClick={() =>
              setSelectedConversation(conversation)
            }
            className={`cursor-pointer rounded-xl transition ${
              selectedConversation?.id === conversation.id
                ? "ring-2 ring-cyan-500"
                : ""
            }`}
          >
            <ConversationCard
              name={conversation.name}
              message={conversation.message}
              status={conversation.status}
              time={conversation.time}
            />
          </div>

        ))}

      </div>

    </div>
  );
}

export default ConversationList;
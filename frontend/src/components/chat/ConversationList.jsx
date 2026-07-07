import { useMemo, useState } from "react";

import {
  MessageCircle,
  Circle,
  Search,
} from "lucide-react";

import ConversationCard from "./ConversationCard";

const FILTERS = [
  "All",
  "Active",
  "Waiting",
  "Resolved",
];

function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
}) {

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("All");

  const filteredConversations = useMemo(() => {

    return conversations.filter((conversation) => {

      const query =
        search.toLowerCase();

      const matchesSearch =
        conversation.name
          .toLowerCase()
          .includes(query) ||

        conversation.last_message
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "All"
          ? true
          : conversation.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  }, [
    conversations,
    search,
    filter,
  ]);


  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">

        <div className="flex items-center justify-between">

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

              {filteredConversations.length}

            </span>

          </div>

        </div>

        {/* Search */}

        <div className="relative mt-5">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search conversations..."
            className="
              w-full
              pl-11
              pr-4
              py-3
              rounded-xl
              border
              border-slate-200
              focus:ring-2
              focus:ring-cyan-500
              outline-none
            "
          />

        </div>

        {/* Filters */}

        <div className="flex gap-2 mt-4 flex-wrap">

          {

            FILTERS.map((item) => (

              <button

                key={item}

                onClick={() =>
                  setFilter(item)
                }

                className={`
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                  transition

                  ${
                    filter === item

                    ? "bg-cyan-600 text-white"

                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"

                  }

                `}

              >

                {item}

              </button>

            ))

          }

        </div>

      </div>

      {/* List */}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {

          filteredConversations.length === 0 ? (

            <div className="flex flex-col justify-center items-center h-full">

              <MessageCircle
                size={44}
                className="text-slate-300"
              />

              <p className="mt-4 text-slate-500">

                No conversations found

              </p>

            </div>

          ) : (

            filteredConversations.map((conversation) => (

              <div

                key={conversation.id}

                onClick={() =>
                  setSelectedConversation(
                    conversation
                  )
                }

                className={`
                  cursor-pointer
                  rounded-2xl
                  transition

                  ${
                    selectedConversation?.id ===
                    conversation.id

                    ? "ring-2 ring-cyan-500 shadow-md"

                    : "hover:shadow-md"

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

          )

        }

      </div>

    </div>

  );

}

export default ConversationList;
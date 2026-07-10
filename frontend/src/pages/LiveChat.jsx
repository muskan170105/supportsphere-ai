import { useEffect, useState } from "react";

import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import CustomerProfile from "../components/customer/CustomerProfile";
import AIReasoningPanel from "../components/analytics/AIReasoningPanel";

import { useChat } from "../context/ChatContext";

import { getSettings } from "../api/settingsApi";

function LiveChat() {

  const {

    conversations,

    selectedConversation,

    customer,

    messages,

    loading,

    selectConversation,

    sendMessage,

  } = useChat();

  const [developerMode, setDeveloperMode] =
    useState(true);

  useEffect(() => {

    loadSettings();

  }, []);

  async function loadSettings() {

    try {

      const settings =
        await getSettings();

      setDeveloperMode(
        settings.developer_mode
      );

    } catch (error) {

      console.error(error);

    }

  }

  const latestAIMessage =

    [...messages]

      .reverse()

      .find(

        (message) =>

          message.sender === "AI"

      );

  return (

    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">

      {/* ===================================================== */}
      {/* LEFT */}
      {/* ===================================================== */}

      <div className="col-span-3 overflow-auto">

        <ConversationList

          conversations={conversations}

          selectedConversation={selectedConversation}

          setSelectedConversation={

            selectConversation

          }

        />

      </div>

      {/* ===================================================== */}
      {/* CENTER */}
      {/* ===================================================== */}

      <div
        className={

          developerMode

            ? "col-span-6"

            : "col-span-9"

        }
      >

        <ChatWindow

          conversation={selectedConversation}

          messages={messages}

          loading={loading}

          onSendMessage={sendMessage}

        />

      </div>

      {/* ===================================================== */}
      {/* RIGHT */}
      {/* ===================================================== */}

      {

        developerMode && (

          <div className="col-span-3 flex flex-col gap-6 overflow-auto">

            <CustomerProfile

              customer={customer}

            />

            <AIReasoningPanel

              planner={
                latestAIMessage?.planner
              }

              retriever={
                latestAIMessage?.retriever
              }

              tool={
                latestAIMessage?.tool
              }

              responseExecution={

                latestAIMessage?.response_execution

                ||

                latestAIMessage?.responseExecution

              }

              confidenceReason={

                latestAIMessage?.confidenceReason

                ||

                latestAIMessage?.confidence_reason

              }

              guardrail={
                latestAIMessage?.guardrail
              }

              memoryBefore={
                latestAIMessage?.memory_before
              }

              memoryAfter={
                latestAIMessage?.memory_after
              }

              timeline={
                latestAIMessage?.timeline
              }

            />

          </div>

        )

      }

    </div>

  );

}

export default LiveChat;
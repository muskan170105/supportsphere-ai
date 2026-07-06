import { useEffect, useState } from "react";

import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import CustomerProfile from "../components/customer/CustomerProfile";
import AgentTimeline from "../components/analytics/AgentTimeline";

import { startChat, sendMessage } from "../api/chatApi";
import { getChatHistory } from "../api/historyApi";
import { getTimeline } from "../api/timelineApi";
import {
  getConversations,
  getCustomer,
} from "../api/conversationApi";

function LiveChat() {
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("session_id")
  );

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const [timeline, setTimeline] = useState([]);

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      let currentSession = sessionId;

      if (!currentSession) {
        const session = await startChat();

        currentSession = session.session_id;

        localStorage.setItem(
          "session_id",
          currentSession
        );

        setSessionId(currentSession);
      }

      const [
        history,
        timelineData,
        conversationData,
      ] = await Promise.all([
        getChatHistory(currentSession),
        getTimeline(currentSession),
        getConversations(),
      ]);

      setMessages(history);

      setTimeline(timelineData);

      setConversations(conversationData);

      if (conversationData.length > 0) {
        setSelectedConversation(
          conversationData[0]
        );

        const customerData =
          await getCustomer(
            conversationData[0].id
          );

        setCustomer(customerData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSendMessage(message) {
    if (!sessionId) return;

    setLoading(true);

    try {
      await sendMessage(sessionId, message);

      const [
        history,
        timelineData,
      ] = await Promise.all([
        getChatHistory(sessionId),
        getTimeline(sessionId),
      ]);

      setMessages(history);

      setTimeline(timelineData);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  async function handleConversationSelect(
    conversation
  ) {
    setSelectedConversation(conversation);

    try {
      const customerData =
        await getCustomer(
          conversation.id
        );

      setCustomer(customerData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Live Chat
        </h1>

        <p className="text-slate-500 mt-2">
          AI-powered customer support workspace
        </p>

      </div>

      {/* Workspace */}

      <div className="grid grid-cols-12 gap-6">

        {/* Conversations */}

        <div className="col-span-3">

          <ConversationList
            conversations={conversations}
            selectedConversation={
              selectedConversation
            }
            setSelectedConversation={
              handleConversationSelect
            }
          />

        </div>

        {/* Chat */}

        <div className="col-span-6">

          <ChatWindow
            conversation={
              selectedConversation
            }
            messages={messages}
            loading={loading}
            onSendMessage={
              handleSendMessage
            }
          />

        </div>

        {/* Right */}

        <div className="col-span-3 space-y-6">

          <CustomerProfile
            customer={customer}
          />

          <AgentTimeline
            timeline={timeline}
          />

        </div>

      </div>

    </div>
  );
}

export default LiveChat;
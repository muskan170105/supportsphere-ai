import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import CustomerProfile from "../components/customer/CustomerProfile";
import AgentTimeline from "../components/analytics/AgentTimeline";

import { useChat } from "../context/ChatContext";

function LiveChat() {

  const {

    conversations,

    selectedConversation,

    customer,

    messages,

    timeline,

    loading,

    selectConversation,

    sendMessage,

  } = useChat();


  return (

    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">

      {/* Left Panel */}

      <div className="col-span-3 overflow-auto">

        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={selectConversation}
        />

      </div>


      {/* Center Panel */}

      <div className="col-span-6">

        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          loading={loading}
          onSendMessage={sendMessage}
        />

      </div>


      {/* Right Panel */}

      <div className="col-span-3 flex flex-col gap-6 overflow-auto">

        <CustomerProfile
          customer={customer}
        />

        <AgentTimeline
          timeline={timeline}
        />

      </div>

    </div>

  );

}

export default LiveChat;
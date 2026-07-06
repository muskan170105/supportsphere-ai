import { useState } from "react";

import DashboardCard from "../components/dashboard/DashboardCard";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";

function Dashboard() {

  // React State
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div>

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-white">
        Dashboard
      </h1>

      <p className="text-slate-400 mt-2">
        Welcome back, Admin.
      </p>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mt-8">

        <DashboardCard
          title="Total Conversations"
          value="1,248"
          change="+18.2%"
        />

        <DashboardCard
          title="AI Resolution Rate"
          value="78.5%"
          change="+12.4%"
        />

        <DashboardCard
          title="Avg Response Time"
          value="2.4 s"
          change="-8.1%"
          positive={false}
        />

        <DashboardCard
          title="Escalation Rate"
          value="8.7%"
          change="-3.2%"
        />

      </div>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* Left Panel */}
        <div className="col-span-1">

          <ConversationList
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />

        </div>

        {/* Right Panel */}
        <div className="col-span-2">

          <ChatWindow
            conversation={selectedConversation}
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Bot,
  TimerReset,
  AlertTriangle,
} from "lucide-react";

import DashboardCard from "../components/dashboard/DashboardCard";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import SystemHealth from "../components/dashboard/SystemHealth";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getAnalytics } from "../api/analyticsApi";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const analyticsData = await getAnalytics();
      setAnalytics(analyticsData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Good Evening 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back, Muskan. Here's what's happening across your AI support platform today.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Total Conversations"
          value={
            analytics
              ? analytics.total_conversations
              : "--"
          }
          change="+18.2%"
          icon={<MessageSquare size={22} />}
        />

        <DashboardCard
          title="AI Resolution Rate"
          value={
            analytics
              ? analytics.ai_resolution_rate
              : "--"
          }
          suffix="%"
          change="+12.4%"
          icon={<Bot size={22} />}
        />

        <DashboardCard
          title="Avg Response Time"
          value={
            analytics
              ? analytics.avg_response_time
              : "--"
          }
          suffix=" s"
          change="-8.1%"
          positive={false}
          icon={<TimerReset size={22} />}
        />

        <DashboardCard
          title="Escalation Rate"
          value={
            analytics
              ? analytics.escalation_rate
              : "--"
          }
          suffix="%"
          change="-3.2%"
          icon={<AlertTriangle size={22} />}
        />

      </div>

      {/* SECOND ROW */}

      <div className="grid grid-cols-12 gap-6 mt-8">

        {/* Recent Activity */}

        <div className="col-span-8">

          <RecentActivity

            timeline={analytics?.timeline || []}

          />

        </div>

        {/* AI Health */}

        <div className="col-span-4">

          <SystemHealth />

        </div>

      </div>

      {/* THIRD ROW */}

      <div className="grid grid-cols-12 gap-6 mt-8">

        {/* Analytics Overview */}

        <div className="col-span-8">

          <AnalyticsOverview />

        </div>

        {/* AI Insights */}

        <div className="col-span-4">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

            <h2 className="text-xl font-bold text-slate-900">
              AI Insights
            </h2>

            <p className="text-sm text-slate-500 mt-1 mb-6">
              Today's platform summary
            </p>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-slate-600">
                  Most Common Intent
                </span>

                <span className="font-semibold text-slate-900">
                  Order Tracking
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-600">
                  AI Accuracy
                </span>

                <span className="font-semibold text-emerald-600">
                  98%
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-600">
                  Average Retrieval
                </span>

                <span className="font-semibold text-slate-900">
                  3 Documents
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-600">
                  Tool Executions
                </span>

                <span className="font-semibold text-slate-900">
                  124 Today
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-600">
                  Knowledge Base
                </span>

                <span className="font-semibold text-slate-900">
                  42 Documents
                </span>

              </div>

              <div className="pt-5 border-t border-slate-200">

                <div className="flex justify-between items-center">

                  <span className="text-slate-700 font-medium">
                    Overall System Status
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                    Healthy
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
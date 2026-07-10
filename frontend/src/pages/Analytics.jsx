import { useEffect, useState } from "react";

import AnalyticsCards from "../components/analytics/AnalyticsCards";
import IntentChart from "../components/analytics/IntentChart";
import ToolUsageChart from "../components/analytics/ToolUsageChart";

import DecisionSummaryCard from "../components/analytics/DecisionSummaryCard";
import AgentExecutionCard from "../components/analytics/AgentExecutionCard";
import AgentTimeline from "../components/analytics/AgentTimeline";
import AIReasoningPanel from "../components/analytics/AIReasoningPanel";

import { getAnalytics } from "../api/analyticsApi";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    loadAnalytics();

    const interval = setInterval(loadAnalytics, 3000);

    return () => clearInterval(interval);

  }, []);

  async function loadAnalytics() {

    try {

      const data = await getAnalytics();

      console.log("Analytics API:", data);

      setAnalytics(data);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-white">

          Analytics Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          Enterprise AI Execution Analytics

        </p>

      </div>

      {/* KPI Cards */}

      <AnalyticsCards analytics={analytics} />

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6">

        <IntentChart analytics={analytics} />

        <ToolUsageChart analytics={analytics} />

      </div>

      {/* Inspector */}

      {

        analytics && (

          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-4 space-y-6">

              <DecisionSummaryCard

                planner={analytics.planner}

                retriever={analytics.retriever}

                responseExecution={

                  analytics.response_execution

                }

              />

              <AgentExecutionCard

                planner={analytics.planner}

                retriever={analytics.retriever}

                tool={analytics.tool}

              />

            </div>

            <div className="col-span-8">

              <AgentTimeline

                timeline={analytics.timeline}

                planner={analytics.planner}

                retriever={analytics.retriever}

                tool={analytics.tool}

                responseExecution={

                  analytics.response_execution

                }

                confidenceReason={

                  analytics.confidence_reason

                }

              />

            </div>

          </div>

        )

      }

      {/* Reasoning */}

      {

        analytics && (

          <AIReasoningPanel

            analytics={analytics}

          />

        )

      }

    </div>

  );

}

export default Analytics;
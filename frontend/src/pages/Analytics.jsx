import { useEffect, useState } from "react";

import AnalyticsCards from "../components/analytics/AnalyticsCards";
import IntentChart from "../components/analytics/IntentChart";
import ToolUsageChart from "../components/analytics/ToolUsageChart";

import { getAnalytics } from "../api/analyticsApi";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    loadAnalytics();

    const interval = setInterval(() => {
      loadAnalytics();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  async function loadAnalytics() {

    try {

      const data = await getAnalytics();

      setAnalytics(data);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Analytics Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Live AI Performance Metrics
        </p>

      </div>

      <AnalyticsCards analytics={analytics} />

      <div className="grid grid-cols-2 gap-6">

        <IntentChart analytics={analytics} />

        <ToolUsageChart analytics={analytics} />

      </div>

    </div>

  );

}

export default Analytics;
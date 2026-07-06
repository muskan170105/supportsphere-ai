function AnalyticsCards({ analytics }) {
  if (!analytics) {
    return (
      <p className="text-slate-400">
        Loading analytics...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">

      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
        <p className="text-slate-400">Total Conversations</p>
        <h2 className="text-3xl font-bold mt-3">
          {analytics.total_conversations}
        </h2>
      </div>

      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
        <p className="text-slate-400">AI Resolution</p>
        <h2 className="text-3xl font-bold mt-3">
          {analytics.ai_resolution_rate}%
        </h2>
      </div>

      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
        <p className="text-slate-400">Avg Response</p>
        <h2 className="text-3xl font-bold mt-3">
          {analytics.avg_response_time}s
        </h2>
      </div>

      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
        <p className="text-slate-400">Escalation</p>
        <h2 className="text-3xl font-bold mt-3">
          {analytics.escalation_rate}%
        </h2>
      </div>

    </div>
  );
}

export default AnalyticsCards;
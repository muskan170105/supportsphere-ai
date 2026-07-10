import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  Clock3,
  Bot,
  ShieldCheck,
  Database,
  TrendingUp,
} from "lucide-react";

function ReportCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h2>

          <p className="text-sm text-emerald-600 mt-3">
            {subtitle}
          </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

function ExportButton({
  icon,
  label,
}) {
  return (
    <button
      className="
        flex
        items-center
        gap-3
        w-full
        p-4
        rounded-xl
        border
        border-slate-200
        hover:border-cyan-400
        hover:bg-cyan-50
        transition
      "
    >
      {icon}

      <span className="font-medium">
        {label}
      </span>
    </button>
  );
}

function Reports() {

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Reports

          </h1>

          <p className="text-slate-500 mt-2">

            AI performance reports and enterprise analytics.

          </p>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-cyan-600
            text-white
            font-semibold
            hover:bg-cyan-700
            transition
          "
        >

          <Download size={18} />

          Export Report

        </button>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-4 gap-6">

        <ReportCard
          title="Conversations"
          value="1,248"
          subtitle="+12% this month"
          icon={<BarChart3 size={22} />}
        />

        <ReportCard
          title="AI Resolution"
          value="98%"
          subtitle="Excellent"
          icon={<Bot size={22} />}
        />

        <ReportCard
          title="Avg Response"
          value="0.43 s"
          subtitle="Very Fast"
          icon={<Clock3 size={22} />}
        />

        <ReportCard
          title="Knowledge Hits"
          value="842"
          subtitle="RAG Retrievals"
          icon={<Database size={22} />}
        />

      </div>

      {/* Reports */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-bold text-slate-900">

              Available Reports

            </h2>

            <p className="text-slate-500 mt-2 mb-6">

              Download enterprise AI analytics.

            </p>

            <div className="space-y-4">

              <ExportButton
                icon={<FileText size={20} />}
                label="Conversation Report (PDF)"
              />

              <ExportButton
                icon={<PieChart size={20} />}
                label="Intent Distribution"
              />

              <ExportButton
                icon={<TrendingUp size={20} />}
                label="AI Performance Report"
              />

              <ExportButton
                icon={<ShieldCheck size={20} />}
                label="Guardrail Audit"
              />

            </div>

          </div>

        </div>

        <div className="col-span-4">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

            <h2 className="text-xl font-bold text-slate-900">

              Report Summary

            </h2>

            <div className="space-y-5 mt-6">

              <SummaryRow
                label="Most Common Intent"
                value="Order Tracking"
              />

              <SummaryRow
                label="Top Tool"
                value="Tracking Tool"
              />

              <SummaryRow
                label="AI Accuracy"
                value="98%"
              />

              <SummaryRow
                label="Escalations"
                value="2%"
              />

              <SummaryRow
                label="Knowledge Base"
                value="42 Docs"
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

function SummaryRow({
  label,
  value,
}) {

  return (

    <div className="flex justify-between items-center">

      <span className="text-slate-500">

        {label}

      </span>

      <span className="font-semibold text-slate-900">

        {value}

      </span>

    </div>

  );

}

export default Reports;
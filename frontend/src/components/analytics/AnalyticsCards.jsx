import {
  MessageSquare,
  Bot,
  Clock3,
  AlertTriangle,
} from "lucide-react";

function StatCard({

  title,

  value,

  icon,

}) {

  const Icon = icon;

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-6
      "
    >

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-500">

          {title}

        </p>

        <Icon
          size={20}
          className="text-indigo-600"
        />

      </div>

      <h2 className="text-3xl font-bold text-slate-900 mt-4">

        {value}

      </h2>

    </div>

  );

}

function AnalyticsCards({

  analytics,

}) {

  if (!analytics) {

    return (

      <div className="grid grid-cols-4 gap-6">

        {

          [...Array(4)].map((_, i) => (

            <div

              key={i}

              className="
                h-36
                rounded-2xl
                border
                border-slate-200
                bg-white
                animate-pulse
              "

            />

          ))

        }

      </div>

    );

  }

  return (

    <div className="grid grid-cols-4 gap-6">

      <StatCard

        title="Total Conversations"

        value={analytics.total_conversations}

        icon={MessageSquare}

      />

      <StatCard

        title="AI Resolution"

        value={`${analytics.ai_resolution_rate}%`}

        icon={Bot}

      />

      <StatCard

        title="Average Response"

        value={`${analytics.avg_response_time}s`}

        icon={Clock3}

      />

      <StatCard

        title="Escalation Rate"

        value={`${analytics.escalation_rate}%`}

        icon={AlertTriangle}

      />

    </div>

  );

}

export default AnalyticsCards;
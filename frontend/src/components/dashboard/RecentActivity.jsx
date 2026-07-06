import {
  BrainCircuit,
  Search,
 Wrench,
  Bot,
  BadgeCheck,
} from "lucide-react";

const activities = [
  {
    title: "Planner detected ORDER_TRACKING",
    time: "2 min ago",
    icon: <BrainCircuit size={16} />,
  },
  {
    title: "Retriever fetched 3 documents",
    time: "2 min ago",
    icon: <Search size={16} />,
  },
  {
    title: "Tracking tool executed",
    time: "1 min ago",
    icon: <Wrench size={16} />,
  },
  {
    title: "Gemini generated response",
    time: "1 min ago",
    icon: <Bot size={16} />,
  },
  {
    title: "Evaluation passed (96%)",
    time: "Just now",
    icon: <BadgeCheck size={16} />,
  },
];

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-slate-900">
        Recent AI Activity
      </h2>

      <p className="text-sm text-slate-500 mt-1 mb-6">
        Latest agent executions
      </p>

      <div className="space-y-5">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex items-start gap-4"
          >

            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">

              {activity.icon}

            </div>

            <div className="flex-1">

              <p className="font-medium text-slate-800">
                {activity.title}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {activity.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;
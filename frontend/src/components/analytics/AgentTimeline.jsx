import {
  BrainCircuit,
  Search,
  Wrench,
  Bot,
  BadgeCheck,
  Clock3,
} from "lucide-react";

function AgentTimeline({ timeline }) {
  const icons = {
    Planner: <BrainCircuit size={18} />,
    Retriever: <Search size={18} />,
    Tool: <Wrench size={18} />,
    Response: <Bot size={18} />,
    Evaluation: <BadgeCheck size={18} />,
  };

  if (timeline.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-slate-900 mb-6">
          AI Execution Pipeline
        </h2>

        <div className="flex flex-col items-center justify-center py-12">

          <BrainCircuit
            size={46}
            className="text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            Waiting for AI Execution
          </h3>

          <p className="text-sm text-slate-500 mt-2 text-center">
            Send a customer message to visualize how
            SupportSphere AI processes every request.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-bold text-slate-900">
          AI Execution Pipeline
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Live execution of enterprise AI agents
        </p>

      </div>

      {/* Timeline */}

      <div className="p-6">

        {timeline.map((step, index) => (

          <div
            key={index}
            className="flex gap-4 relative pb-8 last:pb-0"
          >

            {/* Line */}

            {index !== timeline.length - 1 && (

              <div className="absolute left-5 top-12 h-full border-l-2 border-slate-200"></div>

            )}

            {/* Icon */}

            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 z-10">

              {icons[step.agent] || <Bot size={18} />}

            </div>

            {/* Content */}

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-slate-900">

                  {step.agent} Agent

                </h3>

                <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">

                  <BadgeCheck size={14} />

                  {step.status}

                </span>

              </div>

              <p className="text-sm text-slate-600 mt-2">

                {step.description}

              </p>

              <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">

                <Clock3 size={14} />

                Completed successfully

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AgentTimeline;
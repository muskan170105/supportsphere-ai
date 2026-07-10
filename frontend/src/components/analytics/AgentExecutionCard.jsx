import {
  BrainCircuit,
  Search,
  Wrench,
  Bot,
  CheckCircle2,
  MinusCircle,
  AlertTriangle,
  Clock3,
} from "lucide-react";

function StatusBadge({ executed }) {
  if (executed === true) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        <CheckCircle2 size={14} />
        Success
      </span>
    );
  }

  if (executed === false) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        <MinusCircle size={14} />
        Skipped
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
      <AlertTriangle size={14} />
      Pending
    </span>
  );
}

function AgentExecutionCard({

  planner,

  retriever,

  tool,

  responseExecution,

}) {

  const agents = [

    {
      name: "Planner",

      icon: BrainCircuit,

      executed: true,

      detail:
        planner?.intent || "Intent Detection",

      extra:
        planner?.tool
          ? `Tool: ${planner.tool}`
          : "No Tool",

      color: "text-violet-600",
    },

    {
      name: "Retriever",

      icon: Search,

      executed: retriever?.executed,

      detail: retriever?.executed
        ? `${retriever.retrieved_documents} document(s) retrieved`
        : "Knowledge retrieval skipped",

      extra: retriever?.executed
        ? `Similarity: ${
            retriever.average_similarity ?? "-"
          }`
        : "",

      color: "text-blue-600",
    },

    {
      name: "Tool",

      icon: Wrench,

      executed: tool?.executed,

      detail: tool?.executed
        ? tool.tool_name
        : "Business tool not executed",

      extra: tool?.executed
        ? "Execution completed"
        : "",

      color: "text-amber-600",
    },

    {
      name: "Response",

      icon: Bot,

      executed: true,

      detail: "Natural response generated",

      extra: responseExecution?.latency
        ? `${responseExecution.latency}s`
        : "",

      color: "text-cyan-600",
    },

  ];

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

        <div>

          <h2 className="text-lg font-bold text-slate-900">

            Agent Execution

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            End-to-end execution across the AI pipeline

          </p>

        </div>

      </div>

      {/* Body */}

      <div className="p-5 space-y-4">

        {agents.map((agent) => {

          const Icon = agent.icon;

          return (

            <div

              key={agent.name}

              className="rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200"

            >

              <div className="flex items-center justify-between p-4">

                <div className="flex items-center gap-4">

                  <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">

                    <Icon
                      size={20}
                      className={agent.color}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-900">

                      {agent.name}

                    </h3>

                    <p className="text-sm text-slate-500 mt-1">

                      {agent.detail}

                    </p>

                    {agent.extra && (

                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">

                        <Clock3 size={12} />

                        {agent.extra}

                      </div>

                    )}

                  </div>

                </div>

                <StatusBadge executed={agent.executed} />

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default AgentExecutionCard;
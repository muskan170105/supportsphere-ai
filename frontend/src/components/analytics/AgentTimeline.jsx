import {
  BrainCircuit,
  Search,
  Wrench,
  Bot,
  BadgeCheck,
  Clock3,
  CheckCircle2,
  MinusCircle,
  AlertTriangle,
  FileText,
  Target,
  Database,
} from "lucide-react";

function StatusBadge({ status }) {

  const normalized = (status || "").toLowerCase();

  if (normalized === "success") {

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        <CheckCircle2 size={13} />
        Success
      </span>
    );

  }

  if (normalized === "skipped") {

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        <MinusCircle size={13} />
        Skipped
      </span>
    );

  }

  return (

    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
      <AlertTriangle size={13} />
      Running
    </span>

  );

}

function AgentTimeline({

  timeline,

  planner,

  retriever,

  tool,

  responseExecution,

  confidenceReason,

}) {

  const agentConfig = {

    Planner: {
      icon: <BrainCircuit size={18} />,
      color: "bg-violet-100 text-violet-700",
    },

    Retriever: {
      icon: <Search size={18} />,
      color: "bg-blue-100 text-blue-700",
    },

    Tool: {
      icon: <Wrench size={18} />,
      color: "bg-amber-100 text-amber-700",
    },

    Response: {
      icon: <Bot size={18} />,
      color: "bg-cyan-100 text-cyan-700",
    },

    Evaluation: {
      icon: <BadgeCheck size={18} />,
      color: "bg-emerald-100 text-emerald-700",
    },

  };

  if (!timeline?.length) {

    return (

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-bold text-slate-900">

            AI Inspector

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            Waiting for the first execution...

          </p>

        </div>

        <div className="flex flex-col items-center justify-center py-16">

          <BrainCircuit
            size={54}
            className="text-slate-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-700">

            No execution available

          </h3>

          <p className="mt-2 text-sm text-slate-500">

            Start a conversation to inspect the AI pipeline.

          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-bold text-slate-900">

          AI Inspector

        </h2>

        <p className="text-sm text-slate-500 mt-1">

          Enterprise execution observability

        </p>

      </div>

      {/* Planner */}

      <div className="p-6 border-b border-slate-200">

        <div className="flex items-center gap-2 mb-5">

          <BrainCircuit
            size={18}
            className="text-violet-700"
          />

          <h3 className="font-semibold text-slate-900">

            Planner Decision

          </h3>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Intent

            </p>

            <p className="font-semibold text-slate-900">

              {planner?.intent || "—"}

            </p>

          </div>

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Selected Tool

            </p>

            <p className="font-semibold text-slate-900">

              {planner?.tool || "None"}

            </p>

          </div>

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              RAG Required

            </p>

            <StatusBadge
              status={
                planner?.need_rag
                  ? "Success"
                  : "Skipped"
              }
            />

          </div>

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Confidence

            </p>

            <p className="font-semibold text-slate-900">

              {responseExecution?.confidence ?? 0}%

            </p>

          </div>

        </div>

      </div>

      {/* Retriever */}

      <div className="p-6 border-b border-slate-200">

        <div className="flex items-center gap-2 mb-5">

          <Database
            size={18}
            className="text-blue-700"
          />

          <h3 className="font-semibold text-slate-900">

            Knowledge Retrieval

          </h3>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Executed

            </p>

            <StatusBadge
              status={
                retriever?.executed
                  ? "Success"
                  : "Skipped"
              }
            />

          </div>

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Documents Retrieved

            </p>

            <p className="font-semibold text-slate-900">

              {retriever?.retrieved_documents ?? 0}

            </p>

          </div>

        </div>

        {

          retriever?.sources?.length > 0 && (

            <div className="mt-5">

              <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">

                Knowledge Sources

              </p>

              <div className="flex flex-wrap gap-2">

                {

                  retriever.sources.map((source) => (

                    <div

                      key={source}

                      className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-sm"

                    >

                      <FileText size={14} />

                      {source}

                    </div>

                  ))

                }

              </div>

            </div>

          )

        }

      </div>

      {/* Response */}

      <div className="p-6 border-b border-slate-200">

        <div className="flex items-center gap-2 mb-5">

          <Target
            size={18}
            className="text-emerald-700"
          />

          <h3 className="font-semibold text-slate-900">

            Response Generation

          </h3>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Confidence

            </p>

            <p className="font-semibold text-slate-900">

              {responseExecution?.confidence ?? 0}%

            </p>

          </div>

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Level

            </p>

            <p className="font-semibold text-slate-900">

              {responseExecution?.confidence_level || "-"}

            </p>

          </div>

          <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

              Latency

            </p>

            <p className="font-semibold text-slate-900">

              {responseExecution?.latency
                ? `${responseExecution.latency}s`
                : "-"}

            </p>

          </div>

        </div>

        {

          confidenceReason && (

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                AI Reasoning

              </p>

              <p className="text-sm text-slate-700">

                {confidenceReason}

              </p>

            </div>

          )

        }

      </div>

      {/* Timeline */}

      <div className="p-6">

        <div className="flex items-center gap-2 mb-6">

          <Clock3
            size={18}
            className="text-cyan-700"
          />

          <h3 className="font-semibold text-slate-900">

            Execution Timeline

          </h3>

        </div>

        <div className="space-y-5">

          {

            timeline.map((step, index) => {

              const config =

                agentConfig[step.agent] ||

                {

                  icon: <Bot size={18} />,

                  color:

                    "bg-slate-100 text-slate-700",

                };

              return (

                <div

                  key={index}

                  className="relative flex gap-4"

                >

                  {

                    index !== timeline.length - 1 && (

                      <div className="absolute left-5 top-12 h-full border-l-2 border-dashed border-slate-200" />

                    )

                  }

                  <div

                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${config.color}`}

                  >

                    {config.icon}

                  </div>

                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <h4 className="font-semibold text-slate-900">

                        {step.agent}

                      </h4>

                      <StatusBadge

                        status={step.status}

                      />

                    </div>

                    <p className="mt-3 text-sm text-slate-600">

                      {step.description}

                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">

                      <span>

                        Stage {index + 1}

                      </span>

                      <span>

                        Completed

                      </span>

                    </div>

                  </div>

                </div>

              );

            })

          }

        </div>

      </div>

    </div>

  );

}

export default AgentTimeline;
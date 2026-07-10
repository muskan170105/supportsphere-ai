import {
  Bug,
  BrainCircuit,
  Database,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Clock3,
  CheckCircle2,
  Workflow,
  Cpu,
  Zap,
  ArrowRight,
  ListTree,
} from "lucide-react";

import React from "react";

const Badge = ({
  children,
  color = "slate",
}) => {

  const colorStyles = {

    slate:
      "bg-slate-800 text-slate-300 border-slate-700",

    emerald:
      "bg-emerald-900/30 text-emerald-400 border-emerald-800",

    cyan:
      "bg-cyan-900/30 text-cyan-400 border-cyan-800",

    amber:
      "bg-amber-900/30 text-amber-400 border-amber-800",

    violet:
      "bg-violet-900/30 text-violet-400 border-violet-800",

    red:
      "bg-red-900/30 text-red-400 border-red-800",

    blue:
      "bg-blue-900/30 text-blue-400 border-blue-800",

  };

  return (

    <span
      className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md border ${colorStyles[color]} flex items-center gap-1 w-fit`}
    >

      {children}

    </span>

  );

};

const metricColors = {

  cyan:
    "bg-cyan-900/30 text-cyan-400",

  emerald:
    "bg-emerald-900/30 text-emerald-400",

  amber:
    "bg-amber-900/30 text-amber-400",

  violet:
    "bg-violet-900/30 text-violet-400",

  blue:
    "bg-blue-900/30 text-blue-400",

  red:
    "bg-red-900/30 text-red-400",

};

const MetricCard = ({
  icon,
  label,
  value,
  color,
}) => (

  <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 flex items-center gap-3">

    <div
      className={`p-2 rounded-lg ${metricColors[color]}`}
    >

      {icon}

    </div>

    <div>

      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">

        {label}

      </p>

      <p className="text-slate-200 font-medium text-sm">

        {value}

      </p>

    </div>

  </div>

);

function DeveloperInspector({

  planner,

  retriever,

  tool,

  responseExecution,

  confidenceReason,

  guardrail,

  memoryBefore,

  memoryAfter,

  timeline,

}) {

  const isConfidenceHigh =
    (responseExecution?.confidence ?? 0) > 85;

  const confidenceColor =
    isConfidenceHigh
      ? "emerald"
      : "amber";

  const isBlocked =
    guardrail?.decision?.includes(
      "Blocked"
    );

  return (

    <div className="bg-slate-950 text-slate-300 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 font-sans flex flex-col h-full max-h-[850px]">

      {/* Header */}

      <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">

        <div className="flex items-center gap-3 text-cyan-400">

          <Cpu size={18} />

          <h2 className="font-semibold text-sm tracking-wide">

            Enterprise Observability

          </h2>

        </div>

        <Badge color="cyan">

          <Bug size={12} />

          Debug Mode

        </Badge>

      </div>

      <div className="p-5 space-y-6 overflow-y-auto flex-1">

        {/* Top KPIs */}

        <div className="grid grid-cols-2 gap-3">

          <MetricCard

            icon={<Clock3 size={16} />}

            label="Total Latency"

            value={
              responseExecution?.latency
                ? `${responseExecution.latency}s`
                : "0s"
            }

            color="cyan"

          />

          <MetricCard

            icon={<Activity size={16} />}

            label="Confidence Score"

            value={
              responseExecution?.confidence
                ? `${responseExecution.confidence}%`
                : "0%"
            }

            color={confidenceColor}

          />

        </div>

        {/* Execution Pipeline Visualizer */}

        <section>

          <div className="flex items-center gap-2 mb-3">

            <Workflow
              size={15}
              className="text-slate-400"
            />

            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">

              Execution Pipeline

            </h3>

          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">

            {

              timeline && timeline.length > 0

                ? (

                    <div className="relative">

                      <div className="absolute left-3 top-3 bottom-3 w-px bg-slate-800" />

                      <div className="space-y-4">

                        {

                          timeline.map(

                            (

                              step,

                              index,

                            ) => (

                              <div

                                key={index}

                                className="relative flex items-start gap-4"

                              >

                                <div
                                  className="
                                    w-6
                                    h-6
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    shrink-0
                                    border-2
                                    bg-slate-900
                                    border-emerald-500/50
                                    text-emerald-400
                                    z-10
                                  "
                                >

                                  <CheckCircle2
                                    size={12}
                                  />

                                </div>

                                <div className="pt-0.5">

                                  <div className="flex items-center gap-2">

                                    <span className="text-xs font-semibold text-slate-200">

                                      {step.agent}

                                    </span>

                                    <span className="text-[10px] text-slate-500">

                                      {step.status}

                                    </span>

                                  </div>

                                  <p className="text-xs text-slate-400 mt-1">

                                    {step.description}

                                  </p>

                                </div>

                              </div>

                            )

                          )

                        }

                      </div>

                    </div>

                  )

                : (

                    <p className="text-xs text-slate-500 text-center py-4">

                      No pipeline execution data

                    </p>

                  )

            }

          </div>

        </section>

        {/* Intelligence Engine */}

        <section>

          <div className="flex items-center gap-2 mb-3">

            <BrainCircuit
              size={15}
              className="text-violet-400"
            />

            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">

              Intelligence Engine

            </h3>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {/* Planner */}

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">

              <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-3">

                Planner Decision

              </h4>

              {

                planner

                  ? (

                      <div className="space-y-3">

                        <div>

                          <p className="text-[10px] uppercase text-slate-500 mb-1">

                            Intent

                          </p>

                          <Badge color="violet">

                            {planner.intent}

                          </Badge>

                        </div>

                        <div>

                          <p className="text-[10px] uppercase text-slate-500 mb-1">

                            Tool Selected

                          </p>

                          {

                            planner.tool

                              ? (

                                  <Badge color="amber">

                                    <Zap size={10} />

                                    {planner.tool}

                                  </Badge>

                                )

                              : (

                                  <span className="text-xs text-slate-400">

                                    None

                                  </span>

                                )

                          }

                        </div>

                        <div>

                          <p className="text-[10px] uppercase text-slate-500 mb-1">

                            RAG Required

                          </p>

                          <span className="text-xs font-medium text-slate-300">

                            {

                              planner.need_rag

                                ? "Yes"

                                : "No"

                            }

                          </span>

                        </div>

                      </div>

                    )

                  : (

                      <div className="flex justify-center py-6">

                        <Badge>

                          Planner Skipped

                        </Badge>

                      </div>

                    )

              }

            </div>

            {/* Guardrail */}

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">

              <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-3">

                Guardrail Stage

              </h4>

              {

                guardrail

                  ? (

                      <div className="space-y-4">

                        <div className="flex items-center gap-2">

                          {

                            isBlocked

                              ? (

                                  <ShieldAlert
                                    size={16}
                                    className="text-red-400"
                                  />

                                )

                              : (

                                  <ShieldCheck
                                    size={16}
                                    className="text-emerald-400"
                                  />

                                )

                          }

                          <span className="text-sm font-medium text-slate-200">

                            {guardrail.decision}

                          </span>

                        </div>

                        <div className="grid grid-cols-2 gap-2">

                          <div className="bg-slate-950 rounded border border-slate-800 p-2">

                            <p className="text-[9px] uppercase text-slate-500">

                              Confirmation Required

                            </p>

                            <p className="text-xs font-semibold">

                              {

                                guardrail.confirmation_required

                                  ? "Yes"

                                  : "No"

                              }

                            </p>

                          </div>

                          <div className="bg-slate-950 rounded border border-slate-800 p-2">

                            <p className="text-[9px] uppercase text-slate-500">

                              Confirmation Received

                            </p>

                            <p className="text-xs font-semibold">

                              {

                                guardrail.confirmation_received

                                  ? "Yes"

                                  : "No"

                              }

                            </p>

                          </div>

                        </div>

                      </div>

                    )

                  : (

                      <div className="flex justify-center py-6">

                        <Badge>

                          No Guardrail

                        </Badge>

                      </div>

                    )

              }

            </div>

          </div>

        </section>

        {/* State Transition */}

        <section>

          <div className="flex items-center gap-2 mb-3">

            <ListTree
              size={15}
              className="text-emerald-400"
            />

            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">

              State Transition

            </h3>

          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">

            <div className="grid grid-cols-2 divide-x divide-slate-800">

              {/* Memory Before */}

              <div className="p-4">

                <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-3">

                  Memory Before

                </h4>

                <div className="space-y-3">

                  <div>

                    <p className="text-[10px] uppercase text-slate-500">

                      Intent

                    </p>

                    <p className="text-sm text-slate-200">

                      {memoryBefore?.current_intent ?? "—"}

                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase text-slate-500">

                      Parameters

                    </p>

                    <pre className="text-xs bg-slate-950 rounded-lg p-2 overflow-auto">

{JSON.stringify(memoryBefore?.known_parameters ?? {}, null, 2)}

                    </pre>

                  </div>

                </div>

              </div>

              {/* Memory After */}

              <div className="p-4">

                <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-3">

                  Memory After

                </h4>

                <div className="space-y-3">

                  <div>

                    <p className="text-[10px] uppercase text-slate-500">

                      Intent

                    </p>

                    <p className="text-sm text-slate-200">

                      {memoryAfter?.current_intent ?? "—"}

                    </p>

                  </div>

                  <div>

                    <p className="text-[10px] uppercase text-slate-500">

                      Parameters

                    </p>

                    <pre className="text-xs bg-slate-950 rounded-lg p-2 overflow-auto">

{JSON.stringify(memoryAfter?.known_parameters ?? {}, null, 2)}

                    </pre>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Retriever */}

        {

          retriever?.executed && (

            <section>

              <div className="flex items-center gap-2 mb-3">

                <Database
                  size={15}
                  className="text-blue-400"
                />

                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">

                  Vector Retrieval

                </h3>

              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">

                <div className="flex justify-between">

                  <span className="text-slate-400 text-sm">

                    Documents Retrieved

                  </span>

                  <span className="font-semibold">

                    {retriever.retrieved_documents}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400 text-sm">

                    Average Similarity

                  </span>

                  <span className="font-semibold">

                    {

                      retriever.average_similarity ??

                      "N/A"

                    }

                  </span>

                </div>

                {

                  retriever.sources?.length >

                    0 && (

                    <div>

                      <p className="text-[10px] uppercase text-slate-500 mb-2">

                        Sources

                      </p>

                      <div className="space-y-2">

                        {

                          retriever.sources.map(

                            (

                              source,

                              index,

                            ) => (

                              <div
                                key={index}
                                className="bg-slate-950 rounded-lg border border-slate-800 px-3 py-2 text-xs"
                              >

                                {source}

                              </div>

                            )

                          )

                        }

                      </div>

                    </div>

                  )

                }

              </div>

            </section>

          )

        }

      </div>

    </div>

  );

}

export default DeveloperInspector;
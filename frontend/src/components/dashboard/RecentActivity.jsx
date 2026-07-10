import {
  BrainCircuit,
  Search,
  Wrench,
  Bot,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function getIcon(agent) {

  switch (agent) {

    case "Planner Agent":
    case "Developer Planner":
      return (
        <BrainCircuit
          size={18}
          className="text-violet-600"
        />
      );

    case "Retriever Agent":
      return (
        <Search
          size={18}
          className="text-blue-600"
        />
      );

    case "Tool Agent":
      return (
        <Wrench
          size={18}
          className="text-amber-600"
        />
      );

    case "Response Agent":
      return (
        <Bot
          size={18}
          className="text-cyan-600"
        />
      );

    case "Guardrail Stage":
      return (
        <ShieldCheck
          size={18}
          className="text-emerald-600"
        />
      );

    default:
      return (
        <CheckCircle2
          size={18}
          className="text-slate-600"
        />
      );

  }

}

function RecentActivity({

  timeline = [],

}) {

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-900">

            Recent AI Activity

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            Live execution pipeline

          </p>

        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">

          <Clock3 size={16} />

          Latest Run

        </div>

      </div>

      {/* Timeline */}

      {

        timeline.length === 0

          ? (

              <div className="h-72 flex items-center justify-center">

                <div className="text-center">

                  <Bot
                    size={44}
                    className="mx-auto text-slate-300 mb-3"
                  />

                  <p className="font-semibold text-slate-500">

                    Waiting for first execution

                  </p>

                  <p className="text-sm text-slate-400 mt-1">

                    Run a conversation to populate
                    the activity feed.

                  </p>

                </div>

              </div>

            )

          : (

              <div className="relative">

                <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" />

                <div className="space-y-6">

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
                              w-10
                              h-10
                              rounded-xl
                              bg-slate-50
                              border
                              border-slate-200
                              flex
                              items-center
                              justify-center
                              z-10
                            "
                          >

                            {

                              getIcon(

                                step.agent

                              )

                            }

                          </div>

                          <div className="flex-1">

                            <div className="flex items-center justify-between">

                              <h3 className="font-semibold text-slate-900">

                                {

                                  step.agent

                                }

                              </h3>

                              <span
                                className={`
                                  px-2
                                  py-1
                                  rounded-full
                                  text-xs
                                  font-semibold

                                  ${
                                    step.status === "Completed"

                                      ? "bg-emerald-100 text-emerald-700"

                                      : "bg-amber-100 text-amber-700"

                                  }
                                `}
                              >

                                {

                                  step.status

                                }

                              </span>

                            </div>

                            <p className="text-sm text-slate-500 mt-1">

                              {

                                step.description

                              }

                            </p>

                          </div>

                        </div>

                      )

                    )

                  }

                </div>

              </div>

            )

      }

    </div>

  );

}

export default RecentActivity;
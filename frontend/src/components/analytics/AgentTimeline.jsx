import {
  BrainCircuit,
  Search,
  Wrench,
  Bot,
  BadgeCheck,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function AgentTimeline({ timeline }) {

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


  if (!timeline.length) {

    return (

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-bold text-slate-900">

            AI Execution Pipeline

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            Multi-Agent reasoning will appear here.

          </p>

        </div>

        <div className="flex flex-col items-center justify-center py-14">

          <BrainCircuit
            size={54}
            className="text-slate-300"
          />

          <h3 className="mt-5 font-semibold text-slate-700">

            Waiting for execution

          </h3>

          <p className="text-sm text-slate-500 mt-2 text-center max-w-xs">

            Send a customer message to visualize every
            AI agent involved in the orchestration
            pipeline.

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

          AI Execution Pipeline

        </h2>

        <p className="text-sm text-slate-500 mt-1">

          Live orchestration of SupportSphere AI

        </p>

      </div>


      {/* Pipeline */}

      <div className="p-6 space-y-5">

        {

          timeline.map((step, index) => {

            const config =
              agentConfig[step.agent] || {

                icon: <Bot size={18} />,

                color:
                  "bg-slate-100 text-slate-700",

              };

            return (

              <div
                key={index}
                className="relative"
              >

                {

                  index !==
                    timeline.length - 1 && (

                    <div className="absolute left-5 top-12 h-full border-l-2 border-dashed border-slate-200"/>

                  )

                }

                <div className="flex gap-4">

                  {/* Icon */}

                  <div
                    className={`
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      shrink-0
                      z-10
                      ${config.color}
                    `}
                  >

                    {config.icon}

                  </div>


                  {/* Card */}

                  <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4">

                    <div className="flex justify-between items-center">

                      <h3 className="font-semibold text-slate-900">

                        {step.agent} Agent

                      </h3>

                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">

                        <CheckCircle2 size={14} />

                        {step.status}

                      </span>

                    </div>

                    <p className="text-sm text-slate-600 mt-3">

                      {step.description}

                    </p>

                    <div className="flex items-center justify-between mt-4">

                      <div className="flex items-center gap-2 text-xs text-slate-500">

                        <Clock3 size={14} />

                        Completed

                      </div>

                      <span className="text-xs font-medium text-cyan-700">

                        Step {index + 1}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            );

          })

        }

      </div>

    </div>

  );

}

export default AgentTimeline;
import {
  BrainCircuit,
  Search,
  Database,
  Bot,
  ShieldCheck,
  Activity,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const services = [

  {
    name: "Planner",
    description: "Intent Detection",
    icon: BrainCircuit,
    status: "Online",
    latency: "2 ms",
  },

  {
    name: "Retriever",
    description: "Vector Search",
    icon: Search,
    status: "Online",
    latency: "8 ms",
  },

  {
    name: "Gemini",
    description: "LLM Response",
    icon: Bot,
    status: "Online",
    latency: "420 ms",
  },

  {
    name: "Vector DB",
    description: "Knowledge Store",
    icon: Database,
    status: "Online",
    latency: "6 ms",
  },

];

function ServiceCard({

  service,

}) {

  const Icon = service.icon;

  return (

    <div
      className="
        rounded-xl
        border
        border-slate-200
        p-4
        hover:shadow-md
        transition-all
      "
    >

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-cyan-50
              flex
              items-center
              justify-center
            "
          >

            <Icon
              size={20}
              className="text-cyan-600"
            />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">

              {service.name}

            </h3>

            <p className="text-xs text-slate-500 mt-1">

              {service.description}

            </p>

          </div>

        </div>

        <span
          className="
            px-2.5
            py-1
            rounded-full
            bg-emerald-100
            text-emerald-700
            text-xs
            font-semibold
          "
        >

          {service.status}

        </span>

      </div>

      <div className="mt-4 flex items-center justify-between text-xs">

        <div className="flex items-center gap-2 text-slate-500">

          <Activity size={14} />

          Latency

        </div>

        <span className="font-semibold text-slate-700">

          {service.latency}

        </span>

      </div>

    </div>

  );

}

function SystemHealth() {

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">

            AI System Health

          </h2>

          <p className="text-sm text-slate-500 mt-1">

            Enterprise AI infrastructure

          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            bg-emerald-50
            text-emerald-700
            text-sm
            font-semibold
          "
        >

          <ShieldCheck size={16} />

          All Systems Operational

        </div>

      </div>

      {/* Overall Status */}

      <div
        className="
          mt-6
          rounded-xl
          bg-gradient-to-r
          from-cyan-50
          to-emerald-50
          border
          border-cyan-100
          p-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-white
              flex
              items-center
              justify-center
              shadow-sm
            "
          >

            <Cpu
              size={22}
              className="text-cyan-600"
            />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">

              Enterprise AI Cluster

            </h3>

            <p className="text-sm text-slate-600">

              4 / 4 services healthy

            </p>

          </div>

        </div>

      </div>

      {/* Services */}

      <div className="mt-6 space-y-3">

        {

          services.map(

            (service) => (

              <ServiceCard

                key={service.name}

                service={service}

              />

            )

          )

        }

      </div>

      {/* Footer */}

      <div className="mt-6 pt-5 border-t border-slate-200">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-600">

            <CheckCircle2
              size={16}
              className="text-emerald-600"
            />

            <span className="text-sm">

              Last Health Check

            </span>

          </div>

          <span className="text-sm font-semibold text-slate-800">

            Just now

          </span>

        </div>

      </div>

    </div>

  );

}

export default SystemHealth;
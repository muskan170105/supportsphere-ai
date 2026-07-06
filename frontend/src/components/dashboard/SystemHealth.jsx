import {
  BrainCircuit,
  Search,
  Database,
  Bot,
} from "lucide-react";

const services = [
  {
    name: "Planner",
    icon: <BrainCircuit size={18} />,
    status: "Healthy",
  },
  {
    name: "Retriever",
    icon: <Search size={18} />,
    status: "Healthy",
  },
  {
    name: "Gemini",
    icon: <Bot size={18} />,
    status: "Healthy",
  },
  {
    name: "Vector DB",
    icon: <Database size={18} />,
    status: "Healthy",
  },
];

function SystemHealth() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-slate-900">
        AI System Health
      </h2>

      <p className="text-sm text-slate-500 mt-1 mb-6">
        Core AI services status
      </p>

      <div className="space-y-4">

        {services.map((service) => (

          <div
            key={service.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">

                {service.icon}

              </div>

              <div>

                <p className="font-semibold text-slate-800">
                  {service.name}
                </p>

                <p className="text-xs text-slate-500">
                  Enterprise Service
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>

              <span className="text-sm font-medium text-emerald-600">
                {service.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SystemHealth;
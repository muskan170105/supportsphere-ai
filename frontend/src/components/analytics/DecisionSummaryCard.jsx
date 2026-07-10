import {
  BrainCircuit,
  ShieldCheck,
  Database,
  Timer,
  Wrench,
  CheckCircle2,
} from "lucide-react";

function InfoRow({
  icon,
  label,
  value,
  badge,
}) {
  const Icon = icon;

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">

          <Icon
            size={17}
            className="text-slate-600"
          />

        </div>

        <span className="text-slate-600 font-medium">

          {label}

        </span>

      </div>

      {badge ? badge : (

        <span className="font-semibold text-slate-900">

          {value}

        </span>

      )}

    </div>
  );
}

function DecisionSummaryCard({

  planner,

  retriever,

  responseExecution,

  tool,

}) {

  console.log("DecisionSummaryCard", {
    planner,
    retriever,
    responseExecution,
  });

  const confidence =
    responseExecution?.confidence ?? 0;

  const confidenceLevel =
    responseExecution?.confidence_level ??
    "Low";

  const confidenceColor =

    confidenceLevel === "High"

      ? "bg-emerald-100 text-emerald-700"

      : confidenceLevel === "Medium"

      ? "bg-amber-100 text-amber-700"

      : "bg-red-100 text-red-700";

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">

            <BrainCircuit
              size={22}
              className="text-violet-600"
            />

          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-900">

              AI Decision Summary

            </h2>

            <p className="text-sm text-slate-500">

              Final reasoning outcome

            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <InfoRow

          icon={BrainCircuit}

          label="Detected Intent"

          value={planner?.intent ?? "—"}

        />

        <InfoRow

          icon={Wrench}

          label="Selected Tool"

          value={planner?.tool ?? "None"}

        />

        <InfoRow

          icon={Database}

          label="Knowledge Retrieval"

          value={

            retriever?.executed

              ? `${retriever.retrieved_documents} Documents`

              : "Skipped"

          }

        />

        <InfoRow

          icon={ShieldCheck}

          label="Confidence"

          badge={

            <span

              className={`px-3 py-1 rounded-full text-sm font-semibold ${confidenceColor}`}

            >

              {confidence}% • {confidenceLevel}

            </span>

          }

        />

        <InfoRow

          icon={Timer}

          label="Response Latency"

          value={

            responseExecution?.latency

              ? `${responseExecution.latency}s`

              : "—"

          }

        />

        <InfoRow

          icon={CheckCircle2}

          label="Execution"

          badge={

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">

              Completed

            </span>

          }

        />

      </div>

    </div>

  );

}

export default DecisionSummaryCard;
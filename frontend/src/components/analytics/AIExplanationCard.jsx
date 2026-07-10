import {
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function AIExplanationCard({

  planner,

  retriever,

  tool,

  confidenceReason,

}) {

  function buildExplanation() {

    // -----------------------------
    // Tool-based response
    // -----------------------------

    if (tool?.executed) {

      return `SupportSphere AI identified the customer's intent as "${planner?.intent}" and verified the response using the ${tool.tool_name} business tool. No hallucinated information was used for this answer.`;

    }

    // -----------------------------
    // RAG-based response
    // -----------------------------

    if (retriever?.executed) {

      return `SupportSphere AI searched the company knowledge base, retrieved ${retriever.retrieved_documents} relevant document(s), and generated the response using verified company documentation.`;

    }

    // -----------------------------
    // LLM-only response
    // -----------------------------

    return "SupportSphere AI answered using its language model because neither a business tool nor company knowledge retrieval was required.";

  }

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">

        <div className="flex items-center gap-2">

          <Sparkles
            size={20}
            className="text-cyan-600"
          />

          <h2 className="text-lg font-bold text-slate-900">

            AI Explanation

          </h2>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-4">

          <p className="leading-7 text-slate-700">

            {buildExplanation()}

          </p>

        </div>

        {

          confidenceReason && (

            <div className="mt-5 flex items-start gap-3">

              <ShieldCheck
                size={20}
                className="text-emerald-600 mt-1"
              />

              <div>

                <p className="font-semibold text-slate-900">

                  Confidence Reason

                </p>

                <p className="text-sm text-slate-600 mt-1 leading-6">

                  {confidenceReason}

                </p>

              </div>

            </div>

          )

        }

      </div>

    </div>

  );

}

export default AIExplanationCard;
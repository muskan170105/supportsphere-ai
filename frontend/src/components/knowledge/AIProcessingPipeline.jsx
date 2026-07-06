import {
  Upload,
  FileText,
  Scissors,
  BrainCircuit,
  Database,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: <Upload size={18} />,
    title: "Document Uploaded",
    subtitle: "Successfully received",
  },
  {
    icon: <FileText size={18} />,
    title: "Text Extracted",
    subtitle: "Content parsed",
  },
  {
    icon: <Scissors size={18} />,
    title: "Chunked",
    subtitle: "182 semantic chunks",
  },
  {
    icon: <BrainCircuit size={18} />,
    title: "Embeddings Generated",
    subtitle: "text-embedding-004",
  },
  {
    icon: <Database size={18} />,
    title: "Stored in ChromaDB",
    subtitle: "Vector DB Updated",
  },
  {
    icon: <CheckCircle2 size={18} />,
    title: "Ready for Retrieval",
    subtitle: "Available to AI",
  },
];

function AIProcessingPipeline() {
  return (
    <div>

      <h3 className="font-semibold text-slate-900 mb-5">
        AI Processing Pipeline
      </h3>

      <div className="space-y-5">

        {steps.map((step, index) => (

          <div
            key={index}
            className="flex gap-4"
          >

            <div className="flex flex-col items-center">

              <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">

                {step.icon}

              </div>

              {index !== steps.length - 1 && (

                <div className="w-[2px] flex-1 bg-slate-200 mt-2" />

              )}

            </div>

            <div>

              <h4 className="font-semibold text-slate-900">
                {step.title}
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                {step.subtitle}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIProcessingPipeline;
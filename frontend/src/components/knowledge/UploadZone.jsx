import {
  UploadCloud,
  FileText,
  Database,
  ShieldCheck,
} from "lucide-react";

function UploadZone() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Top */}

      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Upload Documents
          </h2>

          <p className="text-slate-500 mt-2">
            Expand your AI Knowledge Base by uploading company documents.
          </p>

        </div>

        <button
          className="
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            transition
          "
        >
          Select Files
        </button>

      </div>

      {/* Upload Area */}

      <div className="p-8">

        <div
          className="
            border-2
            border-dashed
            border-cyan-300
            rounded-2xl
            bg-cyan-50/40
            hover:bg-cyan-50
            hover:border-cyan-500
            transition
            cursor-pointer
            py-16
            flex
            flex-col
            items-center
          "
        >

          <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center">

            <UploadCloud
              size={42}
              className="text-cyan-600"
            />

          </div>

          <h3 className="mt-6 text-2xl font-bold text-slate-900">
            Drag & Drop Documents
          </h3>

          <p className="mt-3 text-slate-500 text-center max-w-lg">
            Upload PDF, DOCX or TXT documents.
            They will be chunked, embedded and indexed
            automatically for Retrieval-Augmented Generation.
          </p>

          <div className="flex gap-3 mt-8">

            <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium">
              PDF
            </span>

            <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium">
              DOCX
            </span>

            <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium">
              TXT
            </span>

          </div>

        </div>

        {/* Bottom Cards */}

        <div className="grid grid-cols-3 gap-5 mt-8">

          <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <FileText className="text-cyan-600" />

              <div>

                <h4 className="font-semibold text-slate-900">
                  Supported Formats
                </h4>

                <p className="text-sm text-slate-500">
                  PDF, DOCX, TXT
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <Database className="text-cyan-600" />

              <div>

                <h4 className="font-semibold text-slate-900">
                  Vector Database
                </h4>

                <p className="text-sm text-slate-500">
                  ChromaDB Ready
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-cyan-600" />

              <div>

                <h4 className="font-semibold text-slate-900">
                  Processing
                </h4>

                <p className="text-sm text-slate-500">
                  Automatic Chunking & Embeddings
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadZone;
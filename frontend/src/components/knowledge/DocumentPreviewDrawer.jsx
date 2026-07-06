import {
  X,
  FileText,
  Database,
  Boxes,
  CalendarDays,
  CheckCircle2,
  HardDrive,
  Languages,
} from "lucide-react";

import AIProcessingPipeline from "./AIProcessingPipeline";

function DocumentPreviewDrawer({
  open,
  document,
  onClose,
}) {
  if (!open || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      {/* Overlay */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="relative w-[580px] h-full bg-white shadow-2xl flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              AI Document Inspector
            </h2>

            <p className="text-slate-500 mt-1">
              Knowledge Base Asset
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Scrollable */}

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* File */}

          <div className="flex gap-4 items-center">

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">

              <FileText
                size={30}
                className="text-cyan-600"
              />

            </div>

            <div>

              <h3 className="font-bold text-xl text-slate-900">
                {document.name}
              </h3>

              <p className="text-slate-500 mt-1">
                {document.type}
              </p>

            </div>

          </div>

          {/* Metadata */}

          <div>

            <h3 className="font-semibold text-slate-900 mb-4">
              Document Metadata
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <InfoCard
                icon={<Boxes size={18} />}
                title="Chunks"
                value={document.chunks}
              />

              <InfoCard
                icon={<Database size={18} />}
                title="Embedding"
                value="text-embedding-004"
              />

              <InfoCard
                icon={<CalendarDays size={18} />}
                title="Uploaded"
                value={document.uploaded}
              />

              <InfoCard
                icon={<CheckCircle2 size={18} />}
                title="Status"
                value={document.status}
              />

              <InfoCard
                icon={<HardDrive size={18} />}
                title="File Size"
                value="2.3 MB"
              />

              <InfoCard
                icon={<Languages size={18} />}
                title="Language"
                value="English"
              />

            </div>

          </div>

          {/* AI Pipeline */}

          <AIProcessingPipeline />

          {/* Preview */}

          <div>

            <h3 className="font-semibold text-slate-900 mb-4">
              Preview
            </h3>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-600">

              <p className="font-semibold text-slate-900 mb-4">
                Password Reset Policy
              </p>

              Customers can reset their password using the
              <strong> Forgot Password </strong>
              option available on the login page.

              <br /><br />

              After submitting their registered email address,
              an OTP will be sent to verify their identity.

              <br /><br />

              Once verified, the customer can create a new
              password that satisfies the organization's
              password policy.

              <br /><br />

              This preview will later be fetched dynamically
              from the backend after document upload.

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">

      <div className="flex items-center gap-2 text-cyan-600">

        {icon}

        <span className="font-medium">
          {title}
        </span>

      </div>

      <p className="mt-3 font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

export default DocumentPreviewDrawer;
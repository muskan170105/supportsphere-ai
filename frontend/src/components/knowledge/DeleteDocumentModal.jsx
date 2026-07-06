import {
  AlertTriangle,
  Trash2,
  X,
  Database,
} from "lucide-react";

function DeleteDocumentModal({
  open,
  document,
  onClose,
  onDelete,
}) {
  if (!open || !document) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">

      {/* Overlay */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="relative w-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

              <AlertTriangle
                size={28}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Delete Document
              </h2>

              <p className="text-slate-500 mt-1">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="px-8 py-7">

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">

            <h3 className="font-semibold text-slate-900">
              {document.name}
            </h3>

            <p className="text-slate-500 mt-1">
              {document.type}
            </p>

          </div>

          <div className="mt-7">

            <h3 className="font-semibold text-slate-900 mb-4">
              The following data will be removed
            </h3>

            <div className="space-y-3">

              <DeleteItem text="Document metadata" />

              <DeleteItem text="Vector embeddings" />

              <DeleteItem text="ChromaDB index" />

              <DeleteItem text="Search availability" />

            </div>

          </div>

          <div className="mt-8 rounded-xl bg-red-50 border border-red-200 p-4">

            <p className="text-red-700 text-sm">
              Deleting this document will immediately remove it
              from the AI Knowledge Base. Future responses will no
              longer retrieve information from this file.
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="px-8 py-6 border-t border-slate-200 flex justify-end gap-4">

        <button
            onClick={onClose}
            className="
                min-w-[110px]
                px-5
                py-3
                rounded-xl
                border
                border-slate-300
                bg-white
                text-slate-700
                font-medium
                hover:bg-slate-100
                hover:border-slate-400
                transition
            "
        >
        Cancel
        </button>

          <button
            onClick={() => onDelete(document)}
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              transition
            "
          >

            <Trash2 size={18} />

            Delete Document

          </button>

        </div>

      </div>

    </div>
  );
}

function DeleteItem({ text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">

        <Database
          size={18}
          className="text-red-600"
        />

      </div>

      <span className="text-slate-700">
        {text}
      </span>

    </div>
  );
}

export default DeleteDocumentModal;
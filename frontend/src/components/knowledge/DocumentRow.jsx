import {
  FileText,
  Eye,
  Trash2,
  CheckCircle2,
} from "lucide-react";

function DocumentRow({
  document,
  onView,
  onDelete,
}) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition">

      {/* Document */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">

            <FileText
              size={20}
              className="text-cyan-600"
            />

          </div>

          <div>

            <p className="font-semibold text-slate-900">
              {document.name}
            </p>

            <p className="text-xs text-slate-500">
              AI Knowledge Document
            </p>

          </div>

        </div>

      </td>

      {/* Type */}

      <td className="px-6 py-5">

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
          {document.type}
        </span>

      </td>

      {/* Chunks */}

      <td className="px-6 py-5">

        <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-sm font-semibold">
          {document.chunks}
        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">

          <CheckCircle2 size={14} />

          {document.status}

        </span>

      </td>

      {/* Uploaded */}

      <td className="px-6 py-5 text-slate-600 font-medium">
        {document.uploaded}
      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex gap-3">

          <button
            onClick={() => onView(document)}
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-lg
              bg-cyan-50
              hover:bg-cyan-100
              text-cyan-700
              transition
            "
          >
            <Eye size={16} />
            <span className="text-sm font-medium">
              View
            </span>
          </button>

          <button
            onClick={() => onDelete(document)}
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-lg
              bg-red-50
              hover:bg-red-100
              text-red-600
              transition
            "
          >
            <Trash2 size={16} />
            <span className="text-sm font-medium">
              Delete
            </span>
          </button>

        </div>

      </td>

    </tr>
  );
}

export default DocumentRow;
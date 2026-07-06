import {
  FileText,
  Eye,
  Trash2,
  CheckCircle2,
} from "lucide-react";

function DocumentRow({ document }) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition">

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">

            <FileText
              size={20}
              className="text-cyan-600"
            />

          </div>

          <span className="font-medium text-slate-800">
            {document.name}
          </span>

        </div>

      </td>

      <td className="px-6 py-5 text-slate-600">
        {document.type}
      </td>

      <td className="px-6 py-5 text-slate-600">
        {document.chunks}
      </td>

      <td className="px-6 py-5">

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">

          <CheckCircle2 size={14} />

          {document.status}

        </span>

      </td>

      <td className="px-6 py-5 text-slate-600">
        {document.uploaded}
      </td>

      <td className="px-6 py-5">

        <div className="flex gap-2">

          <button className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-cyan-100 flex items-center justify-center transition">

            <Eye
              size={18}
              className="text-slate-700"
            />

          </button>

          <button className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-red-100 flex items-center justify-center transition">

            <Trash2
              size={18}
              className="text-red-500"
            />

          </button>

        </div>

      </td>

    </tr>
  );
}

export default DocumentRow;
import DocumentRow from "./DocumentRow";

const documents = [
  {
    id: 1,
    name: "shipping_policy.pdf",
    type: "PDF",
    chunks: 182,
    status: "Indexed",
    uploaded: "Today",
  },
  {
    id: 2,
    name: "refund_policy.pdf",
    type: "PDF",
    chunks: 145,
    status: "Indexed",
    uploaded: "Yesterday",
  },
  {
    id: 3,
    name: "password_reset.docx",
    type: "DOCX",
    chunks: 74,
    status: "Indexed",
    uploaded: "2 days ago",
  },
  {
    id: 4,
    name: "payment_failure.txt",
    type: "TXT",
    chunks: 58,
    status: "Indexed",
    uploaded: "3 days ago",
  },
];

function DocumentTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Indexed Documents
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Documents currently available to the AI Retriever.
          </p>

        </div>

        <span className="px-4 py-2 rounded-xl bg-cyan-50 text-cyan-700 font-semibold">
          {documents.length} Documents
        </span>

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Document
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Type
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Chunks
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Uploaded
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {documents.map((document) => (

            <DocumentRow
              key={document.id}
              document={document}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DocumentTable;
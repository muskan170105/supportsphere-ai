import DocumentRow from "./DocumentRow";

import {
  useKnowledge,
} from "../../context/KnowledgeContext";


function DocumentTable({
  onView,
  onDelete,
}) {

  const {

    documents,

    loading,

  } = useKnowledge();


  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Indexed Documents
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Documents available to the AI Retriever.
          </p>

        </div>

        <span className="px-4 py-2 rounded-xl bg-cyan-50 text-cyan-700 font-semibold">

          {documents.length} Documents

        </span>

      </div>

      {

        loading ?

        (

          <div className="p-12 text-center text-slate-500">

            Loading documents...

          </div>

        )

        :

        (

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

              {

                documents.map(document => (

                  <DocumentRow

                    key={document.id}

                    document={document}

                    onView={onView}

                    onDelete={onDelete}

                  />

                ))

              }

            </tbody>

          </table>

        )

      }

    </div>

  );

}

export default DocumentTable;
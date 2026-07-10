import {
  Database,
  FileText,
  SearchX,
} from "lucide-react";

function KnowledgeSourcesCard({

  retriever,

}) {

  const hasSources =
    retriever?.sources &&
    retriever.sources.length > 0;

  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">

        <div className="flex items-center gap-2">

          <Database
            size={20}
            className="text-blue-600"
          />

          <h2 className="text-lg font-bold text-slate-900">

            Knowledge Sources

          </h2>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        {

          hasSources ? (

            <div className="space-y-3">

              {

                retriever.sources.map(

                  (source) => (

                    <div

                      key={source}

                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                      "

                    >

                      <FileText
                        size={18}
                        className="text-cyan-600"
                      />

                      <span className="font-medium text-slate-800">

                        {source}

                      </span>

                    </div>

                  )

                )

              }

            </div>

          ) : (

            <div className="flex flex-col items-center justify-center py-8">

              <SearchX
                size={42}
                className="text-slate-300"
              />

              <p className="mt-4 font-medium text-slate-700">

                No Knowledge Retrieved

              </p>

              <p className="mt-2 text-sm text-slate-500 text-center">

                This response was generated
                without retrieving documents
                from the knowledge base.

              </p>

            </div>

          )

        }

      </div>

    </div>

  );

}

export default KnowledgeSourcesCard;
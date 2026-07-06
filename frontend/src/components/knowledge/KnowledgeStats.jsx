import {
  Database,
  FileText,
  Boxes,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Documents",
    value: "42",
    subtitle: "Indexed Files",
    icon: <FileText size={22} />,
  },
  {
    title: "Chunks",
    value: "4,528",
    subtitle: "Vector Chunks",
    icon: <Boxes size={22} />,
  },
  {
    title: "Embedding Model",
    value: "text-embedding-004",
    subtitle: "Google Gemini",
    icon: <Database size={22} />,
  },
  {
    title: "Last Indexed",
    value: "2 min ago",
    subtitle: "Successfully Synced",
    icon: <Clock3 size={22} />,
  },
];

function KnowledgeStats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-slate-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                {item.value}
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                {item.subtitle}
              </p>

            </div>

            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">

              {item.icon}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default KnowledgeStats;
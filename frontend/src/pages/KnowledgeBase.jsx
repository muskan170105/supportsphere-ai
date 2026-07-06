import UploadZone from "../components/knowledge/UploadZone";
import SearchBar from "../components/knowledge/SearchBar";
import DocumentTable from "../components/knowledge/DocumentTable";
import KnowledgeStats from "../components/knowledge/KnowledgeStats";

function KnowledgeBase() {
  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Knowledge Base
          </h1>

          <p className="text-slate-500 mt-2">
            Manage documents powering your AI Retrieval-Augmented Generation
            (RAG) system.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <KnowledgeStats />

      {/* Upload */}

      <div className="mt-8">

        <UploadZone />

      </div>

      {/* Search */}

      <div className="mt-8">

        <SearchBar />

      </div>

      {/* Documents */}

      <div className="mt-8">

        <DocumentTable />

      </div>

    </div>
  );
}

export default KnowledgeBase;
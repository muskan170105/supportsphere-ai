import { useState } from "react";

import UploadZone from "../components/knowledge/UploadZone";
import SearchBar from "../components/knowledge/SearchBar";
import DocumentTable from "../components/knowledge/DocumentTable";
import KnowledgeStats from "../components/knowledge/KnowledgeStats";
import DocumentPreviewDrawer from "../components/knowledge/DocumentPreviewDrawer";
import DeleteDocumentModal from "../components/knowledge/DeleteDocumentModal";

function KnowledgeBase() {

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleView(document) {
    setSelectedDocument(document);
    setDrawerOpen(true);
  }

  function handleDelete(document) {
    setSelectedDocument(document);
    setDeleteOpen(true);
  }

  function confirmDelete(document) {

    console.log("Delete:", document);

    setDeleteOpen(false);

  }

  return (

    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Knowledge Base
          </h1>

          <p className="text-slate-500 mt-2">
            Manage documents powering your AI Retrieval-Augmented Generation system.
          </p>

        </div>

      </div>

      <KnowledgeStats />

      <div className="mt-8">
        <UploadZone />
      </div>

      <div className="mt-8">
        <SearchBar />
      </div>

      <div className="mt-8">

        <DocumentTable
          onView={handleView}
          onDelete={handleDelete}
        />

      </div>

      <DocumentPreviewDrawer
        open={drawerOpen}
        document={selectedDocument}
        onClose={() => setDrawerOpen(false)}
      />

      <DeleteDocumentModal
        open={deleteOpen}
        document={selectedDocument}
        onClose={() => setDeleteOpen(false)}
        onDelete={confirmDelete}
      />

    </div>

  );

}

export default KnowledgeBase;
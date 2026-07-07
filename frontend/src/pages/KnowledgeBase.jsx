import { useState } from "react";

import UploadZone from "../components/knowledge/UploadZone";
import SearchBar from "../components/knowledge/SearchBar";
import DocumentTable from "../components/knowledge/DocumentTable";
import KnowledgeStats from "../components/knowledge/KnowledgeStats";
import DocumentPreviewDrawer from "../components/knowledge/DocumentPreviewDrawer";
import DeleteDocumentModal from "../components/knowledge/DeleteDocumentModal";

import {
  deleteDocument,
} from "../api/knowledgeApi";

import {
  useKnowledge,
} from "../context/KnowledgeContext";


function KnowledgeBase() {

  const [selectedDocument, setSelectedDocument] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const {
    refreshDocuments,
  } = useKnowledge();


  function handleView(document) {

    setSelectedDocument(document);

    setDrawerOpen(true);

  }


  function handleDelete(document) {

    setSelectedDocument(document);

    setDeleteOpen(true);

  }


  async function confirmDelete(document) {

    try {

      await deleteDocument(
        document.id
      );

      await refreshDocuments();

      setDeleteOpen(false);

      setSelectedDocument(null);

    }
    catch (error) {

      console.error(error);

    }

  }


  return (

    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Knowledge Base
          </h1>

          <p className="text-slate-500 mt-2">
            Manage documents powering your AI
            Retrieval-Augmented Generation system.
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

        onClose={() => {

          setDrawerOpen(false);

          setSelectedDocument(null);

        }}

      />

      <DeleteDocumentModal

        open={deleteOpen}

        document={selectedDocument}

        onClose={() => {

          setDeleteOpen(false);

          setSelectedDocument(null);

        }}

        onDelete={confirmDelete}

      />

    </div>

  );

}

export default KnowledgeBase;
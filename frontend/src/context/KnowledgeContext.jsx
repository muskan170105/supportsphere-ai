import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getDocuments,
} from "../api/knowledgeApi";

const KnowledgeContext =
  createContext(null);

export function KnowledgeProvider({
  children,
}) {

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function refreshDocuments(){

    try{

      setLoading(true);

      const data =
        await getDocuments();

      setDocuments(data);

    }
    finally{

      setLoading(false);

    }

  }

  useEffect(()=>{

    refreshDocuments();

  },[]);

  return (

    <KnowledgeContext.Provider

      value={{

        documents,

        loading,

        refreshDocuments,

      }}

    >

      {children}

    </KnowledgeContext.Provider>

  );

}

export function useKnowledge(){

  const context =
    useContext(
      KnowledgeContext
    );

  if(!context){

    throw new Error(
      "useKnowledge must be used inside KnowledgeProvider"
    );

  }

  return context;

}
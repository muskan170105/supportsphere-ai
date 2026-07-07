import axiosClient from "./axiosClient";


export async function uploadDocument(file) {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axiosClient.post(

      "/knowledge-base/upload",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

    );

  return response.data;

}


export async function getDocuments() {

  const response =
    await axiosClient.get(
      "/knowledge-base/documents"
    );

  return response.data;

}


export async function getDocumentPreview(
  id,
) {

  const response =
    await axiosClient.get(
      `/knowledge-base/document/${id}`
    );

  return response.data;

}

export async function deleteDocument(
  documentId,
) {

  const response =
    await axiosClient.delete(
      `/knowledge-base/document/${documentId}`
    );

  return response.data;

}
import axiosClient from "./axiosClient";

export async function getChatHistory(sessionId) {

  const response = await axiosClient.get(
    `/chat/history/${sessionId}`
  );

  return response.data.messages;
}
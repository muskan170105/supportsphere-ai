import axiosClient from "./axiosClient";

export async function getTimeline(sessionId) {

  const response = await axiosClient.get(
    `/chat/timeline/${sessionId}`
  );

  return response.data;

}
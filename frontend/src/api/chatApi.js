import axiosClient from "./axiosClient";


export async function startChat(){

  const response =
    await axiosClient.post(
      "/chat/start"
    );

  return response.data;

}



export async function sendMessage(
  sessionId,
  message
){

  const response =
    await axiosClient.post(
      "/chat",
      {
        session_id: sessionId,
        message,
      }
    );

  return response.data;

}



export async function getHistory(
  sessionId
){

  const response =
    await axiosClient.get(
      `/chat/history/${sessionId}`
    );

  return response.data;

}



export async function getTimeline(
  sessionId
){

  const response =
    await axiosClient.get(
      `/chat/timeline/${sessionId}`
    );

  return response.data;

}
import axiosClient from "./axiosClient";


// =====================================================
// Start Chat
// =====================================================

export async function startChat() {

  const response =
    await axiosClient.post(
      "/chat/start"
    );

  return response.data;

}


// =====================================================
// Send Message
// =====================================================

export async function sendMessage(
  sessionId,
  message,
) {

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


// =====================================================
// History
// =====================================================

export async function getHistory(
  sessionId,
) {

  const response =
    await axiosClient.get(

      `/chat/history/${sessionId}`

    );

  return response.data;

}


// =====================================================
// Timeline
// =====================================================

export async function getTimeline(
  sessionId,
) {

  const response =
    await axiosClient.get(

      `/chat/timeline/${sessionId}`

    );

  return response.data;

}
import axiosClient from "./axiosClient";

export async function startChat() {
  try {
    const response = await axiosClient.post("/chat/start");
    return response.data;
  } catch (error) {
    console.error("Failed to start chat:", error);
    throw error;
  }
}

export async function sendMessage(sessionId, message) {
  try {
    const response = await axiosClient.post("/chat", {
      session_id: sessionId,
      message: message,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}
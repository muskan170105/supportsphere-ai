import axiosClient from "./axiosClient";

export async function getConversations() {
  const response = await axiosClient.get("/conversations");
  return response.data;
}
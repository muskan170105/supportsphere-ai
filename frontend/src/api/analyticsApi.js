import axiosClient from "./axiosClient";

export async function getAnalytics() {
  const response = await axiosClient.get("/analytics");
  return response.data;
}
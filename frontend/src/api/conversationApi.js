import axiosClient from "./axiosClient";

export async function getConversations() {
  const response = await axiosClient.get("/conversations");
  return response.data;
}

export async function getCustomer(customerId) {
  const response = await axiosClient.get(`/customers/${customerId}`);
  return response.data;
}
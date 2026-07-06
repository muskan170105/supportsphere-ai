import axiosClient from "./axiosClient";

export async function getCustomer(customerId) {
  const response = await axiosClient.get(
    `/customers/${customerId}`
  );

  return response.data;
}
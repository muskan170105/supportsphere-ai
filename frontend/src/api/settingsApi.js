import axiosClient from "./axiosClient";

// ============================================
// GET SETTINGS
// ============================================

export async function getSettings() {

  const response = await axiosClient.get(
    "/settings"
  );

  return response.data;

}

// ============================================
// UPDATE SETTINGS
// ============================================

export async function updateSettings(
  settings,
) {

  const response = await axiosClient.put(
    "/settings",
    settings,
  );

  return response.data;

}
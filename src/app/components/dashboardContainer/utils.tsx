/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import getConfig from "next/config";

const config = getConfig().publicRuntimeConfig;
export async function handleLogout() {
  const sessionId = sessionStorage.getItem("token");
  try {
    const response: { data: { code: number; message: string } } =
      await axios.post(`${config.basePath}/api/logout`, null, {
        headers: { "Content-Type": "application/json", sessionId },
      });

    console.log("response", response); // "Logged out successfully"
    if (response?.data.code === 200) {
      clearSession();
    }
  } catch (error) {
    clearSession();
    console.error("Error during logout:", error);
  }
}

export function clearSession() {
  // Clear session storage
  sessionStorage.clear();
  // Redirect to login page
  window.location.href = `${config.basePath}/login`;
}

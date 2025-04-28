import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sessionid = req.headers.sessionid as string;
    const { BASE_PATH } = getConfig().serverRuntimeConfig;
    const response = await axios.post(
      `${BASE_PATH}/logout/log`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          sessionid,
        },
      }
    );
    console.log("Logout response:", response.data);
    if (response.data.code === 200) {
      res.status(200).json({ code: 200, message: "Logged out successfully" });
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Logout failed");
  }
};

export default logout;

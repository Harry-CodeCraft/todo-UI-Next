import { UserLgoinCredentials } from "@/lib/types/auth.login";
import axios from "axios";

export async function authService(credentials: UserLgoinCredentials) {
  const path = `${process.env.path}/auth/login`;
  const response = await axios.post(path, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

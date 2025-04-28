import axios from "axios";

export async function todoCreateService(payload: FormData) {
  const path = `${process.env.path}/notes/create`;
  const sessionId = sessionStorage.getItem("token");
  const response = await axios.post(path, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      sessionId,
    },
  });

  return response.data;
}

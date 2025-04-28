import axios from "axios";

export async function todoDeleteService(noteId: string) {
  const path = `${process.env.path}/notes/delete`;
  const sessionId = sessionStorage.getItem("token");
  const response = await axios.delete(path, {
    headers: {
      "Content-Type": "application/json",
      sessionId,
      noteId,
    },
  });
  return response.data;
}

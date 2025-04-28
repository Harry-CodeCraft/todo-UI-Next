import { IEnablePagination } from "@/lib/types/todoListType";
import axios from "axios";

export async function todoListService({ pagination, page }: IEnablePagination) {
  const { pageNum, limit } = page!;
  const path = `${process.env.path}/notes/all?skip=${pageNum}&limit=${limit}`;
  const sessionId = sessionStorage.getItem("token");
  const response = await axios.get(path, {
    headers: {
      "Content-Type": "application/json",
      sessionId,
      userId: "66dec36f6f0d8b2235472e01",
      pagination,
    },
  });

  return response.data;
}

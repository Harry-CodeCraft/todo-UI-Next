import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/lib/redux/hook";
import { CreateTodoData } from "@/lib/types/todoCreateType";
import { useDispatch } from "react-redux";
import { listTodoActionCreator } from "@/lib/action/feature/todo/list/list.action";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Delete, Download, Edit, RemoveRedEye } from "@mui/icons-material";
import CreateNoteDialogue from "@/app/components/createNoteDialogue";
import { deleteTodoActionCreator } from "@/lib/action/feature/todo/delete/delete.action";

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const listData = useAppSelector(
    (state) => state.defaultTodoState?.listTodoState
  );
  const { listTodoError, listTodoloading } = listData;
  const deleteDataRes = useAppSelector(
    (state) => state.defaultTodoState?.deleteTodoState
  );
  const [todos, setTodos] = useState<CreateTodoData[] | undefined>();
  const [editTodo, setEditTodo] = useState<CreateTodoData | undefined>();
  const [page, setPage] = useState<number>(1);
  const [limitPerPage, setLimitPerPage] = useState<number>(20);
  const [editTodoDialogOpen, setEditTodoDialogOpen] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Ref for the load more trigger

  useEffect(() => {
    dispatch(
      listTodoActionCreator({
        pagination: true,
        page: { pageNum: page, limit: limitPerPage },
      })
    );
    console.log("todos2", page);
  }, [dispatch, page]);

  useEffect(() => {
    if (deleteDataRes?.response?.code === 200) {
      dispatch(
        listTodoActionCreator({
          pagination: true,
          page: { pageNum: 1, limit: 10 },
        })
      );
    }
  }, [dispatch, deleteDataRes]);

  useEffect(() => {
    if (listData?.response?.code === 200 && listData?.data?.length) {
      setTodos(!todos?.length ? listData?.data : todos?.concat(listData?.data));
    }
  }, [listData]);
  
  // IntersectionObserver to detect when the loadMoreRef is visible
  console.log("todos", page, limitPerPage);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !listTodoloading) {
          console.log("Loading more data...");
          console.log("todos1", page);
          setPage((prevPage) => prevPage + 1); // Load the next page
        } else {
          console.log("Not loading more data...");
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully visible
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [listTodoloading]);

  function openDialogFn(todo: CreateTodoData) {
    setEditTodo(todo);
    setEditTodoDialogOpen(true);
  }

  const downloadFile = async (todo: CreateTodoData) => {
    const sessionId = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.path}/notes/file/download`, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
          sessionId: sessionId || "",
          noteId: todo._id,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = todo.file; // the appropriate file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.open(url);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("There was an error downloading the file:", error);
    }
  };

  const deleteNoteHandlerFn = (todo: CreateTodoData) => {
    dispatch(deleteTodoActionCreator(todo._id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: "40px" }}>
        {todos?.length} Todos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos?.length &&
              todos?.map((todo, i) => (
                <TableRow key={i + todo._id}>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.type.desc}</TableCell>
                  <TableCell style={{ padding: "10px" }}>
                    <div dangerouslySetInnerHTML={{ __html: todo?.desc }} />
                  </TableCell>
                  <TableCell width={280}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "5px" }}
                    >
                      <RemoveRedEye />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginRight: "5px" }}
                      onClick={() => deleteNoteHandlerFn(todo)}
                    >
                      <Delete />
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: "5px" }}
                      onClick={() => openDialogFn(todo)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => downloadFile(todo)}
                    >
                      <Download />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div ref={loadMoreRef} style={{ height: "20px", marginTop: "20px" }} />
      <Typography>
        {listTodoloading && <span>Loading...</span>}
        {listTodoError && (
          <span style={{ color: "red" }}>Error while loading the data!</span>
        )}
      </Typography>
      <CreateNoteDialogue
        name="Edit Note"
        open={editTodoDialogOpen}
        todo={editTodo}
        onClose={() => setEditTodoDialogOpen(false)}
      />
    </Container>
  );
};

export default TodoList;

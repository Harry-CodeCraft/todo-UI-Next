import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import TodoContainer from "@/pages/todo/create/todoContainer";
import { CreateTodoData } from "@/lib/types/todoCreateType";
import { Close } from "@mui/icons-material";

interface HeaderProps {
  name: string;
  open: boolean;
  todo?: CreateTodoData;
  onClose?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CreateNoteDialogue: React.FC<HeaderProps> = (props) => {
  const { name, open, todo, onClose } = props;
  return (
    <Dialog open={open} fullWidth closeAfterTransition>
      <DialogTitle>
        {name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TodoContainer todo={todo} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialogue;

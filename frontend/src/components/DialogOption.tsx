import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DialogOptionProps {
  open: boolean;
  onClose: (args?: any) => void;
  onAgree: (args?: any) => void;
  title?: string;
  content?: string;
}

function DialogOption({
  open,
  onClose,
  onAgree,
  title = "Do you want delete item? ❌",
  content = "Delete One Item ⭕️ 😬",
}: DialogOptionProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree} autoFocus>
          Agree
        </Button>
        <Button onClick={onClose} color="error">
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogOption;

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Divider,
  SxProps,
  Theme,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { IComment } from "../shared/interface/comment";
import { useAppSelector } from "../stores";
import { selectAuth } from "../stores/slices/auth";
import DialogOption from "./DialogOption";

interface CommentProps {
  sx?: SxProps<Theme>;
  comment: IComment;
  onDeleteComment: (id: number) => void;
}

function Comment({ sx, comment, onDeleteComment }: CommentProps) {
  const [open, setOpen] = React.useState(false);
  const { auth: user } = useAppSelector(selectAuth);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleAgree = React.useCallback(() => {
    onDeleteComment(comment.id);
    handleClose();
  }, [comment.id]);

  return (
    <Box sx={sx} className="comment-container">
      <Box sx={{ display: "flex", paddingBottom: 2 }}>
        <Avatar sx={{ width: 56, height: 56, fontSize: "24px" }}>
          {comment.user.username[0]}
        </Avatar>
        <Box sx={{ marginLeft: 2, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box sx={{ minWidth: "96px" }}>
                <Typography component="div">{comment.user.username}</Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: "10px" }}
                  color="green"
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Rating sx={{ marginLeft: 3 }} value={comment.rate} readOnly />
            </Box>
            {user !== null && user.id === comment.user.id ? (
              <Box className="delete-comment">
                <IconButton aria-label="delete" onClick={handleOpen}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : null}
          </Box>
          <Typography component="legend" gutterBottom sx={{ marginTop: 1 }}>
            {comment.content}
          </Typography>
        </Box>
      </Box>
      <Divider light />
      <DialogOption
        title="Do you want delete comment ?"
        content="Delete one comment 😬"
        onAgree={handleAgree}
        onClose={handleClose}
        open={open}
      />
    </Box>
  );
}

export default Comment;

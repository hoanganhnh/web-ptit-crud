import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Divider,
  SxProps,
  Theme,
} from "@mui/material";

interface CommentProps {
  sx?: SxProps<Theme>;
}

function Comment({ sx }: CommentProps) {
  return (
    <Box sx={sx}>
      <Box sx={{ display: "flex", paddingBottom: 2 }}>
        <Avatar sx={{ width: 56, height: 56, fontSize: "24px" }}>H</Avatar>
        <Box sx={{ marginLeft: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography component="legend">Nguyen Thi Quynh Anh</Typography>
              <Typography
                component="span"
                sx={{ fontSize: "14px" }}
                color="green"
              >
                17/12/2022
              </Typography>
            </Box>
            <Rating sx={{ marginLeft: 3 }} value={null} />
          </Box>
          <Typography variant="body2" gutterBottom sx={{ marginTop: 1 }}>
            If there is an error loading the avatar image, the component falls
            back to an alternative in the following order:
          </Typography>
        </Box>
      </Box>
      <Divider light />
    </Box>
  );
}

export default Comment;

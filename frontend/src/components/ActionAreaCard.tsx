import * as React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    maxWidth: 345,
    justifyContent: "center",
  },
  content: {
    width: "100%",
  },
}));

function ActionAreaCard() {
  const classes = useStyles();
  return (
    <Link to="/book/11" className={classes.container}>
      <Card className={classes.content}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nguyen Hoang Anh
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ActionAreaCard;

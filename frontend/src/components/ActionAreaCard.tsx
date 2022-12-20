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
import { IBook } from "../shared/interface/book";
import { ImageBookDefault } from "./ImageStatic";

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

interface ActionAreaCardProps {
  book: IBook;
}

function ActionAreaCard({ book }: ActionAreaCardProps) {
  const classes = useStyles();
  return (
    <Link to={`book/${book.id}`} className={classes.container}>
      <Card className={classes.content}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={book.image ? book.image.url : ImageBookDefault}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book.author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ActionAreaCard;

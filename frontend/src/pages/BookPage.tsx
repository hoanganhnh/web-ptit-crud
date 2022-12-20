import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Comment from "../components/Comment";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axiosClient from "../services/axios-client";
import { IBook } from "../shared/interface/book";
import { ImageBookDefault } from "../components/ImageStatic";
import dayjs from "dayjs";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 24,
  },
  imgContainer: { height: 560 },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    textAlign: "left",
    "@media (min-width: 1200px)": {
      padding: "0 56px 0 56px",
    },
  },
  gruopBtn: {
    display: "flex",
    width: "100%",
  },
  gruopQty: {
    marginRight: 36,
  },
}));

function BookPage() {
  const classes = useStyles();

  const [book, setBook] = React.useState<IBook>({} as IBook);

  const { id } = useParams();

  React.useEffect(() => {
    const getBookById = async (id: string) => {
      try {
        const { data } = await axiosClient.get(`books/${id}`);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getBookById(id);
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box className={classes.container}>
          <Grid container>
            <Grid item sm={12} md={12} lg={6}>
              <Box className={classes.imgContainer}>
                <img
                  className={classes.img}
                  src={book.image ? book.image.url : ImageBookDefault}
                  alt="product"
                />
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box className={classes.content}>
                <Typography gutterBottom variant="h4" component="div">
                  {book.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {book.author}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Description
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {book.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" component="div">
                    Public:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ marginLeft: 2 }}
                  >
                    {dayjs(book.publicDate).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" component="div">
                    Price:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ marginLeft: 2 }}
                  >
                    {`${book.price}`}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <AttachMoneyIcon />
                  </Typography>
                </Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ marginTop: 2 }}
                >
                  Amount
                </Typography>
                <Box className={classes.gruopBtn}>
                  <Box className={classes.gruopQty}>
                    <ButtonGroup>
                      <Button aria-label="increase" onClick={() => {}}>
                        <AddIcon fontSize="small" />
                      </Button>
                      <Button sx={{ pointerEvents: "none" }}>1</Button>
                      <Button aria-label="reduce" onClick={() => {}}>
                        <RemoveIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    padding: 2,
                    minWidth: "200px",
                    lineHeight: "24px",
                  }}
                >
                  Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: "left", marginTop: 6 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ marginBottom: 2 }}
          >
            Comments
          </Typography>
          <Comment sx={{ marginBottom: 2 }} />
          <Comment sx={{ marginBottom: 2 }} />
          <Typography gutterBottom variant="h6" component="div">
            Add a comment
          </Typography>
          <Box component="form">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" component="div">
                Rate this Book ?
              </Typography>
              <Rating value={3} sx={{ marginLeft: 3 }} />
            </Box>
            <TextField
              margin="normal"
              fullWidth
              id="add-comment"
              name="add-comment"
              multiline
              minRows={5}
              maxRows={10}
              placeholder="Write a comment..."
            />
            <Button variant="contained" sx={{ marginTop: "24px" }}>
              Add my comment
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default BookPage;

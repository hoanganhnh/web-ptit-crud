import React from "react";
import { useParams } from "react-router-dom";
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
import { toast, ToastContainer } from "react-toastify";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";

import Comment from "../components/Comment";
import Navbar from "../components/Navbar";
import axiosClient from "../services/axios-client";
import { IBook } from "../shared/interface/book";
import { ImageBookDefault } from "../components/ImageStatic";
import { IComment } from "../shared/interface/comment";
import { useAppDispatch, useAppSelector } from "../stores";
import { isAuthenticated } from "../stores/slices/auth";
import Footer from "../components/Footer";
import { getMyOrder } from "../stores/slices/order";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 24,
  },
  imgContainer: { height: "100%", width: "100%" },
  img: {
    width: "90%",
    height: "90%",
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
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [rate, setRate] = React.useState(0);
  const [content, setContent] = React.useState<string>("");
  const [disable, setDisable] = React.useState(true);

  // order
  const [amount, setAmount] = React.useState(0);

  const isAuthen = useAppSelector(isAuthenticated);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    const getBookById = async (id: string) => {
      try {
        const { data } = await axiosClient.get(`books/${id}`);

        setBook(data);
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getBookById(id);
    }
  }, [id]);

  const onRateChange = (event: React.SyntheticEvent, value: number | null) => {
    if (value) {
      setRate(value);
    }
  };

  const resetCommetInput = React.useCallback(() => {
    setContent("");
    setDisable(true);
    setRate(0);
  }, []);

  const onChangeCommentContent = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (value) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setContent(value);
  };

  const handleAddComment = async () => {
    try {
      const { data } = await axiosClient.post("comments", {
        content,
        rate,
        bookId: id,
      });
      setComments((preState) => [...preState, data]);
      resetCommetInput();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axiosClient.delete(`comments/${commentId}`);
      setComments((preState) =>
        preState.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.log("delete comment");
      console.log(error);
    }
  };

  const onIncrementAmount = React.useCallback(() => {
    setAmount((preState) => preState + 1);
  }, []);

  const onDecrementAmount = React.useCallback(() => {
    setAmount((preState) => {
      if (preState <= 0) {
        return 0;
      }
      return preState - 1;
    });
  }, []);

  const handleOrder = async () => {
    if (!amount) {
      toast.error("Please choose amount book !");
      return;
    }
    try {
      const { status } = await axiosClient.post("orders", {
        amount,
        bookId: id,
      });

      if (status === 201) {
        await dispatch(getMyOrder());
        toast.success("Order book successfull!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                      <Button aria-label="increase" onClick={onIncrementAmount}>
                        <AddIcon fontSize="small" />
                      </Button>
                      <Button sx={{ pointerEvents: "none" }}>{amount}</Button>
                      <Button aria-label="reduce" onClick={onDecrementAmount}>
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
                  onClick={handleOrder}
                >
                  Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: "left", marginTop: 6 }}>
          {comments.length ? (
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ marginBottom: 2 }}
            >
              Comments
            </Typography>
          ) : null}
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                onDeleteComment={handleDeleteComment}
                sx={{ marginBottom: 2 }}
              />
            );
          })}
          {isAuthen ? (
            <>
              <Typography gutterBottom variant="h6" component="div">
                Add a comment
              </Typography>
              <Box component="form">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" component="div">
                    Rate this Book ?
                  </Typography>
                  <Rating
                    value={rate}
                    sx={{ marginLeft: 3 }}
                    onChange={onRateChange}
                  />
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
                  value={content}
                  onChange={onChangeCommentContent}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: "24px" }}
                  disabled={disable}
                  onClick={handleAddComment}
                >
                  Add my comment
                </Button>
              </Box>
            </>
          ) : null}
        </Box>
      </Container>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
}

export default BookPage;

import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { isAuthenticated, logout, selectAuth } from "../../stores/slices/auth";
import { useAppDispatch, useAppSelector } from "../../stores";
import { IBook } from "../../shared/interface/book";
import axiosClient from "../../services/axios-client";

function AdminDashboard() {
  const [data, setData] = React.useState<IBook[]>([]);
  const [open, setOpen] = React.useState(false);
  const [itemId, setItemId] = React.useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { auth: user } = useAppSelector(selectAuth);
  const isAuthen = useAppSelector(isAuthenticated);

  React.useEffect(() => {
    const getDatas = async () => {
      const res = await axiosClient.get("books");
      setData(res.data);
    };
    getDatas();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const addNew = () => {
    navigate("/action");
  };

  const editItem = (id: number) => {
    if (!isAuthen) {
      navigate("/signin", {
        replace: true,
        state: { from: location },
      });
      return;
    }
    navigate(`/action/${id}`);
  };

  const handleDeleteItem = async () => {
    setData((preData) => preData.filter((d) => d.id !== +itemId));
    await axiosClient.delete(`books/${itemId}`);
  };

  const deleleItem = (id: number) => {
    if (!isAuthen) {
      navigate("/signin", {
        replace: true,
        state: { from: location },
      });
      return;
    }
    setOpen(true);
    setItemId(id);
  };

  const handleAgree = () => {
    setOpen(false);
    handleDeleteItem();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="xl" className="App">
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" color="inherit">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              Book online
            </Typography>

            {isAuthen && user !== null ? (
              <Box
                component="div"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginRight: 3 }}
                >
                  {user.username}
                </Typography>
                <Button color="primary" sx={{ marginRight: 2 }}>
                  <Link to="/" style={{ color: "#1976d2" }}>
                    Home
                  </Link>
                </Button>
                <Button variant="outlined" onClick={handleLogout}>
                  Log out
                </Button>
              </Box>
            ) : (
              <Box component="div">
                <Button color="primary">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button color="primary">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "40px" }}
        onClick={addNew}
      >
        Add Book
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Author
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Public date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Page
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Category
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.author}</TableCell>
                <TableCell align="center">
                  {new Date(row.publicDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{row.page}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                  {isAuthen ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => editItem(row.id)}
                        sx={{ marginRight: "16px" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => deleleItem(row.id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want delete item? ❌"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete One Item ⭕️ 😬
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose} color="error">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;

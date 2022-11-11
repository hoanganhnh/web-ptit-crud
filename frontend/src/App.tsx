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
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import axiosClient from "./services/axios-client";

import "./styles/App.css";

type BookType = {
  id: number;
  title: string;
  author: string;
  description: string;
  publicDate: string;
  page: number;
  category: string;
};

function App() {
  const navigate = useNavigate();
  const [data, setData] = React.useState<BookType[]>([]);
  const [open, setOpen] = React.useState(false);
  const [itemId, setItemId] = React.useState<number>(0);

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
    navigate(`/action/${id}`);
  };

  const handleDeleteItem = async () => {
    setData((preData) => preData.filter((d) => d.id !== +itemId));
    await axiosClient.delete(`books/${itemId}`);
  };

  const deleleItem = (id: number) => {
    setOpen(true);
    setItemId(id);
  };

  const handleAgree = () => {
    setOpen(false);
    handleDeleteItem();
  };

  return (
    <Box className="App">
      <Button
        variant="contained"
        color="success"
        sx={{ marginBottom: "40px" }}
        onClick={addNew}
      >
        New Pet
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">title</TableCell>
              <TableCell align="center">author</TableCell>
              <TableCell align="center">public date</TableCell>
              <TableCell align="center">page</TableCell>
              <TableCell align="center">category</TableCell>
              <TableCell align="center">Action</TableCell>
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
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => editItem(row.id)}
                    sx={{ marginRight: "16px" }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" onClick={() => deleleItem(row.id)}>
                    Delete
                  </Button>
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
    </Box>
  );
}

export default App;

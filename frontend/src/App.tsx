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
import axios from "axios";

import "./styles/App.css";

type Employee = {
  id: number;
  name: string;
  dob: string;
  department: string;
  vaccinated: number;
};

function App() {
  const navigate = useNavigate();
  const [data, setData] = React.useState<Employee[]>([]);
  const [open, setOpen] = React.useState(false);
  const [itemId, setItemId] = React.useState<number>(0);

  React.useEffect(() => {
    const getDatas = async () => {
      const res = await axios.get("http://localhost:5000/api/employees");
      setData(res.data);
    };
    getDatas();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const addNew = () => {
    navigate("/handle");
  };

  const editItem = (id: number) => {
    navigate(`/handle/${id}`);
  };

  const handleDeleteItem = async () => {
    setData((preData) => preData.filter((d) => d.id !== +itemId));
    await axios.delete(`http://localhost:5000/api/employees/${itemId}`);
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
        New Item
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">DOB</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Vaccinated</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  {new Date(row.dob).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={row.vaccinated > 0 ? true : false}
                    size="small"
                    disabled
                  />
                </TableCell>
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
          {"Do you want delete item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete One Item
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

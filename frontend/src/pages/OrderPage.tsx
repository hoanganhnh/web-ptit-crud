import React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DialogOption from "../components/DialogOption";
import { Link } from "react-router-dom";

const books = [
  {
    id: 42,
    title: "Linux for beginer",
    author: "John",
    description: "Linux hahaha",
    publicDate: "2022-11-19T17:00:00.000Z",
    page: 2,
    price: 1,
    category: "Hacking",
    image: {
      id: "18e976e9-c7dd-4d55-9a49-e082fbad2ff9",
      path: "public\\images\\3762577e0-6f43-4704-98af-1594d3dfd092.jpg",
      url: "http://localhost:5000\\images\\3762577e0-6f43-4704-98af-1594d3dfd092.jpg",
    },
  },
  {
    id: 44,
    title: "Css",
    author: "Hoaa",
    description:
      'Examples are better than 1000 words. Examples are often easier to understand than text explanations.\n\nThis tutorial supplements all explanations with clarifying "Try it Yourself" examples.',
    publicDate: "2022-11-19T17:00:00.000Z",
    page: 1,
    price: 3,
    category: "Coding",
    image: {
      id: "8d542b89-09a9-477d-a08f-38dc9d395cce",
      path: "public\\images\\1b4416627-8098-4eb9-9938-0e475d1549dc.jpg",
      url: "http://localhost:5000\\images\\1b4416627-8098-4eb9-9938-0e475d1549dc.jpg",
    },
  },
];

function OrderPage() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
  };

  const onDeleteCartItem = () => {
    setOpen(true);
  };

  const hanleOrderProduct = () => {};
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          textAlign="left"
          sx={{ marginTop: 3 }}
        >
          My Order
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 960 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "600" }}
                ></TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Author
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Amount
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
              {books.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Link to={`/book/${row.id}`}>
                      <img
                        src={row.image.url}
                        alt={row.title}
                        className="image-item-oder"
                      />
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/book/${row.id}`}>{row.title}</Link>
                  </TableCell>
                  <TableCell align="center">{row.author}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button aria-label="increase" onClick={() => {}}>
                        <AddIcon fontSize="small" />
                      </Button>
                      <Button sx={{ pointerEvents: "none" }}>1</Button>
                      <Button aria-label="reduce" onClick={() => {}}>
                        <RemoveIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" color="text.secondary">
                      {row.price}
                      <AttachMoneyIcon sx={{ marginBottom: "-4px" }} />
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" onClick={onDeleteCartItem}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="right"
          sx={{ marginTop: 3 }}
        >
          Total: 3000
          <AttachMoneyIcon sx={{ marginBottom: "-3px" }} />
        </Typography>
        <Button variant="outlined" onClick={hanleOrderProduct}>
          Save Order
        </Button>
      </Container>
      <DialogOption onAgree={handleAgree} onClose={handleClose} open={open} />
      <Footer />
    </>
  );
}

export default OrderPage;

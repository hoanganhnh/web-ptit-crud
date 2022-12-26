import React from "react";
import { Link } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
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
import axiosClient from "../services/axios-client";
import { IOrder } from "../shared/interface/order";
import { useAppDispatch } from "../stores";
import { getMyOrder, setOrdersStore } from "../stores/slices/order";

function OrderPage() {
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [idItem, setIdItem] = React.useState("");
  const [total, setTotal] = React.useState(0);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getMyOrders = async () => {
      try {
        const res = await dispatch(getMyOrder());
        const orders = await unwrapResult(res);
        setOrders(orders);
        caculatorTotalPrice(orders);
      } catch (error) {
        console.log(error);
      }
    };
    getMyOrders();
  }, []);

  const caculatorTotalPrice = React.useCallback((data: any[]) => {
    const totalPrice = data.reduce((value: number, currentValue: IOrder) => {
      return value + currentValue.amount * currentValue.book.price;
    }, 0);
    setTotal(totalPrice);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleAgree = React.useCallback(() => {
    setOpen(false);
    if (idItem) {
      onDeleteCartItem(idItem);
    }
  }, [idItem]);

  const handleOpen = React.useCallback((id: string) => {
    setOpen(true);
    setIdItem(id);
  }, []);

  const onDeleteCartItem = React.useCallback(async (orderId: string) => {
    try {
      await axiosClient.delete(`orders/${orderId}`);
      setOrders((preState) => {
        const nextState = preState.filter((order) => order.id !== orderId);
        caculatorTotalPrice(nextState);
        dispatch(setOrdersStore(nextState));
        return nextState;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateOrderItem = async (
    type: "increment" | "decrement",
    { id, currentAmount }: { id: string; currentAmount: number }
  ) => {
    try {
      if (type === "increment") {
        const newOrders = [...orders];
        const indx = newOrders.findIndex((order) => order.id === id);
        const currentOrder = { ...newOrders[indx], amount: currentAmount + 1 };
        newOrders.splice(indx, 1, currentOrder);
        setOrders(newOrders);
        caculatorTotalPrice(newOrders);
        await axiosClient.patch(`orders/${id}`, {
          amount: currentAmount + 1,
        });
      }
      if (type == "decrement") {
        const newOrders = [...orders];
        const indx = newOrders.findIndex((order) => order.id === id);
        const currentOrder = {
          ...newOrders[indx],
          amount: currentAmount - 1,
        };
        newOrders.splice(indx, 1, currentOrder);
        setOrders(newOrders);
        caculatorTotalPrice(newOrders);
        await axiosClient.patch(`orders/${id}`, {
          amount: currentAmount - 1,
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {orders.length === 0 ? (
          <Typography
            variant="h4"
            gutterBottom
            textAlign="left"
            sx={{ marginTop: 3, height: "95vh" }}
          >
            Empty order
          </Typography>
        ) : (
          <>
            <Typography
              variant="h4"
              gutterBottom
              textAlign="left"
              sx={{ marginTop: 3 }}
            >
              My Order
            </Typography>
            <TableContainer component={Paper} sx={{ minHeight: "50vh" }}>
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
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Link to={`/book/${order.book.id}`}>
                          <img
                            src={order.book.image.url}
                            alt={order.book.title}
                            className="image-item-oder"
                          />
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/book/${order.book.id}`}>
                          {order.book.title}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{order.book.author}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup>
                          <Button
                            aria-label="increase"
                            onClick={() =>
                              updateOrderItem("increment", {
                                id: order.id,
                                currentAmount: order.amount,
                              })
                            }
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                          <Button sx={{ pointerEvents: "none" }}>
                            {order.amount}
                          </Button>
                          <Button
                            aria-label="reduce"
                            sx={{
                              pointerEvents:
                                order.amount === 1 ? "none" : "inherit",
                            }}
                            onClick={() =>
                              updateOrderItem("decrement", {
                                id: order.id,
                                currentAmount: order.amount,
                              })
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6" color="text.secondary">
                          {order.book.price}
                          <AttachMoneyIcon sx={{ marginBottom: "-4px" }} />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleOpen(order.id)}
                        >
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
              Total: {total}
              <AttachMoneyIcon sx={{ marginBottom: "-3px" }} />
            </Typography>
            {/* <Button variant="outlined" onClick={hanleOrderProduct}>
              Save Order
            </Button> */}
          </>
        )}
      </Container>
      <DialogOption onAgree={handleAgree} onClose={handleClose} open={open} />
      <Footer />
    </>
  );
}

export default OrderPage;

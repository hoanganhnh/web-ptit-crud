import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Router } from "../routers/Router";
import { useAppDispatch, useAppSelector } from "../stores";
import {
  isAuthenticated,
  logout,
  selectAdmin,
  selectAuth,
} from "../stores/slices/auth";
import {
  getMyOrder,
  ordersSelector,
  setOrdersStore,
} from "../stores/slices/order";
import { unwrapResult } from "@reduxjs/toolkit";

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: "none !important",
  },
  toolbar: {
    padding: "0 !important",
    justifyContent: "center",
  },
  navlinks: {
    marginLeft: 10,
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "30px",
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    marginLeft: 10,
    color: "#3f51b5",
    "&:hover": {
      color: "#00b0ff",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectAdmin);
  const isAuthen = useAppSelector(isAuthenticated);
  const { auth: user } = useAppSelector(selectAuth);
  const { orders } = useAppSelector(ordersSelector);

  React.useEffect(() => {
    const getMyOrders = async () => {
      const res = await dispatch(getMyOrder());
      const orders = await unwrapResult(res);
      dispatch(setOrdersStore(orders));
    };

    getMyOrders();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="lg">
      <AppBar
        position="relative"
        color="transparent"
        className={classes.container}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" className={classes.logo}>
            <Link
              to={Router.home}
              className={classes.link}
              style={{ margin: 0 }}
            >
              Book Shop
            </Link>
          </Typography>
          <div className={classes.navlinks}>
            {isAdmin && (
              <Link to={Router.admin.dashboard} className={classes.link}>
                Dashboard
              </Link>
            )}

            <Link to={Router.order} className={classes.link}>
              {orders.length ? (
                <Badge badgeContent={orders.length} color="primary">
                  <ShoppingCartIcon sx={{ fontSize: "30px" }} />
                </Badge>
              ) : (
                <ShoppingCartIcon sx={{ fontSize: "30px" }} />
              )}
            </Link>

            {isAuthen ? (
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: 1,
                }}
              >
                <Typography
                  component="legend"
                  sx={{ margin: "0 12px", userSelect: "none" }}
                >
                  {user?.username}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{ marginLeft: 1 }}
                >
                  Log out
                </Button>
              </Box>
            ) : (
              <Box component="div" sx={{ marginLeft: 2 }}>
                <Button color="primary">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button color="primary">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </Box>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
export default Navbar;

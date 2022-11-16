import * as React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Button,
  Grid,
  Link as LinkMUI,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { setLocalStorage } from "../utils/local-storage";
import axiosClient from "../services/axios-client";
import { login, setAuth, setToken } from "../stores/slices/auth";
import { ILogin } from "../shared/interface/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../stores";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <LinkMUI color="inherit">hoanganh</LinkMUI> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
// @TODO: validation
export default function SignIn() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const values: ILogin = {
        email: data.get("email") as string,
        password: data.get("password") as string,
      };
      const res = await dispatch(login(values));
      const { user, accessToken } = unwrapResult(res);
      dispatch(setAuth(user));
      dispatch(setToken(accessToken));

      if (user && location.state?.from?.pathname) {
        navigate(location.state.from.pathname);
      } else {
        // comeback to home page
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12} justifyContent="center">
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

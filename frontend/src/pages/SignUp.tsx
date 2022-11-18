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
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import * as yup from "yup";

import { setAuth, setToken, signup } from "../stores/slices/auth";
import { useAppDispatch } from "../stores";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(6, "Confirm password should be of minimum 6 characters length")
    .oneOf([yup.ref("password"), null], "Confirm password must match password"),
});

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
export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] =
    React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ confirmPassword, ...values }) => {
      try {
        const res = await dispatch(signup(values));
        const { user, accessToken } = unwrapResult(res);
        dispatch(setAuth(user));
        dispatch(setToken(accessToken));

        navigate("/");
      } catch (error: any) {
        console.log(error);
        if (
          error.statusCode == 400 &&
          error.message.toLowerCase().includes("email")
        ) {
          formik.setFieldError("email", error.message);
        }

        if (
          error.statusCode == 400 &&
          error.message.toLowerCase().includes("username")
        ) {
          formik.setFieldError("username", error.message);
        }
      }
    },
  });

  const toggleShowPassword = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const toggleShowConfirmPassword = React.useCallback(() => {
    setConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowConfirmPassword}
                      onMouseDown={toggleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs={12} justifyContent="center">
                <Link to="/signin">{"Do have an account? Sign In"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

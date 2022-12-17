import React from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#212121",
    width: `100%`,
    position: "relative",
    overflow: "hidden",
    marginTop: "6em",
    padding: "2em 0 ",
  },
  link: {
    fontSize: "1.25em",
    color: "#fff",
    "&:hover": {
      color: "#212121",
    },
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    "&:hover": {
      color: "#757ce8",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography className={classes.copylight}>&copy;Hoang Anh</Typography>
      </Container>
    </footer>
  );
}

export default Footer;

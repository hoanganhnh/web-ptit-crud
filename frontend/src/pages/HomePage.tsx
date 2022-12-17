import React from "react";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import ActionAreaCard from "../components/ActionAreaCard";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="center" spacing={4}>
          <Grid item xs={12} md={6} lg={3} alignItems="center">
            <ActionAreaCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ActionAreaCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ActionAreaCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ActionAreaCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ActionAreaCard />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;

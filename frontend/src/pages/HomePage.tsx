import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import ActionAreaCard from "../components/ActionAreaCard";

import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div>
        <Link to="/book/11">book</Link>
      </div>
      <div>
        <Link to="/admin">admin</Link>
      </div>
      <div>
        <Link to="/action">action</Link>
      </div>
      <div>
        <Link to="/order">order</Link>
      </div>
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
    </div>
  );
}

export default HomePage;

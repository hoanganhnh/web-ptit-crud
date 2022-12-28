import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Grid } from "@mui/material";

import ActionAreaCard from "../components/ActionAreaCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllBook } from "../services/book.service";

function HomePage() {
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBook,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
        <Grid container direction="row" alignItems="center" spacing={4}>
          {data?.map((book) => (
            <Grid item xs={12} md={6} lg={3} alignItems="center" key={book.id}>
              <ActionAreaCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;

import React from "react";
import { Container, Grid } from "@mui/material";

import ActionAreaCard from "../components/ActionAreaCard";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IBook } from "../shared/interface/book";
import axiosClient from "../services/axios-client";

function HomePage() {
  const [books, setBooks] = React.useState<IBook[]>([]);

  React.useEffect(() => {
    const getDatas = async () => {
      const res = await axiosClient.get("books");
      setBooks(res.data);
    };
    getDatas();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
        <Grid container direction="row" alignItems="center" spacing={4}>
          {books.map((book) => (
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

import React from "react";
import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles(() => ({
  container: {},
  imgContainer: { height: 560 },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    textAlign: "left",
    "@media (min-width: 1200px)": {
      padding: "0 56px 0 56px",
    },
  },
  gruopBtn: {
    display: "flex",
    width: "100%",
  },
  gruopQty: {
    marginRight: 36,
  },
}));

function BookPage() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item sm={12} md={12} lg={6}>
          <Box className={classes.imgContainer}>
            <img
              className={classes.img}
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
              alt="product"
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box className={classes.content}>
            <Typography gutterBottom variant="h4" component="div">
              Name
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ marginBottom: 1 }}
            >
              Nguyen Hoang Anh
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
              ligula. Mauris consequat ornare feugiat.
            </Typography>
            <Box className={classes.gruopBtn}>
              <Box className={classes.gruopQty}>
                <ButtonGroup>
                  <Button aria-label="increase" onClick={() => {}}>
                    <AddIcon fontSize="small" />
                  </Button>
                  <Button disabled sx={{ color: "#000" }}>
                    1
                  </Button>
                  <Button aria-label="reduce" onClick={() => {}}>
                    <RemoveIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Box>
              <Button variant="contained">Order</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookPage;

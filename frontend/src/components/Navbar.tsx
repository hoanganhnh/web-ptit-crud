import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: "none !important",
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
    "&:hover": {
      // color: "yellow",
      borderBottom: "1px solid #ddd",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" className={classes.container}>
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Book Shop
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/about" className={classes.link}>
            About
          </Link>
          <Link to="/contact" className={classes.link}>
            Contact
          </Link>
          <Link to="/faq" className={classes.link}>
            FAQ
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

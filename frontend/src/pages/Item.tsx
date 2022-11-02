import React from "react";
import {
  AlertProps,
  Box,
  Button,
  FormGroup,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Item() {
  const [open, setOpen] = React.useState(false);
  const [errorSave, setErrorSave] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  const [errorName, setErrorName] = React.useState("");

  const [state, setState] = React.useState({
    name: "",
    species: "",
    age: 0,
    neutered: 0,
  });
  const [errors, setErrors] = React.useState({
    name: "",
    species: "",
    age: "",
  });
  const { idItem } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (idItem) {
      getItemById(+idItem);
    }
  }, [idItem]);

  const getItemById = async (id: number) => {
    const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
    setState(res.data);
  };

  const handleChangeState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const addNewItem = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        data
      );

      if (response.status === 201) {
        setOpen(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error.response.data.message);

      setErrorName(error.response.data.message);
      setOpen(false);
      setErrorSave(true);
    }
  };

  const updateItem = async (data: any) => {
    console.log("update");

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/employees/${idItem}`,
        data
      );

      if (response.status === 200) {
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
      setUpdate(false);
      setErrorSave(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!idItem) {
      if (!state.name) {
        setErrors((preState) => ({ ...preState, name: "Name is require" }));
        return;
      }

      if (!state.species) {
        setErrors((preState) => ({
          ...preState,
          species: "species is require",
        }));
        return;
      }

      if (+state.age === 0) {
        console.log("addd");

        setErrors((preState) => ({
          ...preState,
          age: "age is require != 0",
        }));
        return;
      }

      addNewItem(state);
    } else {
      if (!state.name) {
        setErrors((preState) => ({ ...preState, name: "Name is require" }));
        return;
      }

      if (!state.species) {
        setErrors((preState) => ({
          ...preState,
          species: "species is require",
        }));
        return;
      }

      if (!state.age) {
        setErrors((preState) => ({
          ...preState,
          age: "age is require != 0",
        }));
        return;
      }

      // @ts-ignore
      if (state?.id) {
        // @ts-ignore
        delete state.id;
        updateItem(state);
      }
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setErrorSave(false);
  };

  return (
    <Box>
      <FormGroup>
        <InputLabel htmlFor="name">name</InputLabel>
        <TextField
          id="name"
          aria-describedby="my-helper-text"
          name="name"
          color="primary"
          required
          value={state.name}
          placeholder="Name"
          helperText={errors.name || errorName}
          error={errors.name || errorName ? true : false}
          onChange={handleChangeState}
        />
        <InputLabel htmlFor="species">species</InputLabel>
        <TextField
          id="species"
          aria-describedby="my-helper-text"
          name="species"
          color="primary"
          required
          value={state.species}
          placeholder="species"
          helperText={errors.species}
          error={errors.species ? true : false}
          onChange={handleChangeState}
        />
        <InputLabel htmlFor="age">age</InputLabel>
        <TextField
          id="age"
          aria-describedby="my-helper-text"
          name="age"
          color="primary"
          required
          type="number"
          value={state.age}
          helperText={errors.age}
          error={errors.age ? true : false}
          placeholder="vaccinated"
          onChange={handleChangeState}
        />
        <InputLabel htmlFor="neutered">neutered</InputLabel>
        <TextField
          id="neutered"
          aria-describedby="my-helper-text"
          name="neutered"
          color="primary"
          required
          type="number"
          value={state.neutered}
          placeholder="vaccinated"
          onChange={handleChangeState}
        />

        <Button
          variant="outlined"
          type="submit"
          onClick={handleSubmit}
          sx={{ marginTop: "20px" }}
        >
          {idItem ? "Update" : "Save"}
        </Button>
      </FormGroup>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a Add new Successfull
        </Alert>
      </Snackbar>
      <Snackbar open={errorSave} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={() => setErrorSave(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Save error, Name is existed !
        </Alert>
      </Snackbar>
      <Snackbar open={update} autoHideDuration={200} onClose={handleClose}>
        <Alert
          onClose={() => setUpdate(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a Update successfull
        </Alert>
      </Snackbar>
      <Button onClick={() => navigate("/")} sx={{ marginTop: "200px" }}>
        👉 Back to home
      </Button>
    </Box>
  );
}

export default Item;

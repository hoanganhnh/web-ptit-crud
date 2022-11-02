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

function convertDate(timestamp: string) {
  const dateNow = new Date(timestamp);
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month =
    monthWithOffset.toString().length < 2
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  const materialDateInput = `${year}-${month}-${date}`;
  return materialDateInput;
}

function Item() {
  const [open, setOpen] = React.useState(false);
  const [errorSave, setErrorSave] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  const [state, setState] = React.useState({
    name: "",
    department: "",
    vaccinated: 0,
    dob: "",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    department: "",
    dob: "",
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

      if (response.status === 200) {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (data: any) => {
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
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!idItem) {
      if (!state.name) {
        setErrors((preState) => ({ ...preState, name: "Name is require" }));
        return;
      }

      if (!state.department) {
        setErrors((preState) => ({
          ...preState,
          department: "department is require",
        }));
        return;
      }

      if (!state.dob) {
        setErrors((preState) => ({
          ...preState,
          dob: "dob is require",
        }));
        return;
      }

      setOpen(true);
      addNewItem(state);
      navigate("/");
    } else {
      if (!state.name) {
        setErrors((preState) => ({ ...preState, name: "Name is require" }));
        return;
      }

      if (!state.department) {
        setErrors((preState) => ({
          ...preState,
          department: "department is require",
        }));
        return;
      }

      if (!state.dob) {
        setErrors((preState) => ({
          ...preState,
          dob: "dob is require",
        }));
        return;
      }
      console.log("update");
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
  };

  return (
    <Box>
      <FormGroup>
        <InputLabel htmlFor="name">Name</InputLabel>
        <TextField
          id="name"
          aria-describedby="my-helper-text"
          name="name"
          color="primary"
          required
          value={state.name}
          placeholder="Name"
          helperText={errors.name}
          error={errors.name ? true : false}
          onChange={handleChangeState}
        />
        <InputLabel htmlFor="department">Department</InputLabel>
        <TextField
          id="department"
          aria-describedby="my-helper-text"
          name="department"
          color="primary"
          required
          value={state.department}
          placeholder="department"
          helperText={errors.department}
          error={errors.department ? true : false}
          onChange={handleChangeState}
        />
        <InputLabel htmlFor="vaccinated">Vaccinated</InputLabel>
        <TextField
          id="vaccinated"
          aria-describedby="my-helper-text"
          name="vaccinated"
          color="primary"
          required
          type="number"
          value={state.vaccinated}
          placeholder="vaccinated"
          onChange={handleChangeState}
        />
        <InputLabel htmlFor="dob">DOB</InputLabel>
        <TextField
          id="dob"
          aria-describedby="my-helper-text"
          name="dob"
          color="primary"
          required
          type="date"
          value={idItem ? convertDate(state?.dob) : state?.dob}
          placeholder="dob"
          helperText={errors.dob}
          error={errors.dob ? true : false}
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
          Save error
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
    </Box>
  );
}

export default Item;

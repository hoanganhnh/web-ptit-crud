import React from "react";
import {
  AlertProps,
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

import axiosClient from "../services/axios-client";
import Book from "../types/type-book";
import FileUpload, {
  FileUploadProps,
} from "../components/file-upload/FileUpload";
import FileUploadv2 from "../components/file-upload-v2/FileUploadv2";

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

  const [imgUrl, setImgUrl] = React.useState<string>("");

  const [state, setState] = React.useState<Book>({
    title: "",
    author: "",
    description: "",
    publicDate: "",
    page: 0,
    category: "",
  });

  const [disabled, setDisabled] = React.useState<boolean>(true);

  const [publicDate, setPublicDate] = React.useState<Dayjs | null>(null);

  const { idItem } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (idItem) {
      getItemById(+idItem);
    } else {
      setDisabled(false);
    }
  }, [idItem]);

  const getItemById = async (id: number) => {
    const res = await axiosClient.get(`books/${id}`);
    delete res.data.id;
    setState(res.data);
    setPublicDate(res.data.publicDate);
  };

  const handleChangeState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const addNewItem = async (data: any) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/books`,
        data
      );

      if (response.status === 201) {
        setOpen(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);

      setOpen(false);
      setErrorSave(true);
    }
  };

  const updateItem = async (data: Book) => {
    try {
      // @TODO: update axios instance
      const response = await axios.patch(
        `http://localhost:5000/api/books/${idItem}`,
        data
      );

      // const response = await axiosClient.patch(`books/${idItem}`, data);

      if (response.status === 200) {
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
      setUpdate(false);
      setErrorSave(true);
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

  const handleChangeDate = (newValue: Dayjs | null) => {
    setPublicDate(newValue);
    setState({ ...state, publicDate: dayjs(newValue).format() });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!disabled) {
      return;
    }
    if (!idItem) {
      addNewItem(state);
    } else {
      updateItem(state);
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setState({ ...state, category: event.target.value });
  };

  const handleChangeAction = () => {
    if (disabled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={6} justifyContent="center">
          <Typography
            component="h1"
            variant="h5"
            marginBottom={2}
            color="GrayText"
          >
            Book action
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <InputLabel htmlFor="title">title</InputLabel>
            <TextField
              id="title"
              name="title"
              color="primary"
              placeholder="title"
              fullWidth
              required
              // error={!!errors.title}
              // helperText={errors.title ? errors.title.message : ""}
              value={state.title}
              onChange={handleChangeState}
              disabled={disabled}
            />
            <InputLabel htmlFor="author">author</InputLabel>
            <TextField
              id="author"
              aria-describedby="my-helper-text"
              color="primary"
              name="author"
              required
              fullWidth
              placeholder="author"
              // error={!!errors.author}
              // helperText={errors.author ? errors.author.message : ""}
              value={state.author}
              onChange={handleChangeState}
              disabled={disabled}
            />
            <InputLabel htmlFor="description">description</InputLabel>
            <TextField
              id="description"
              name="description"
              aria-describedby="my-helper-text"
              color="primary"
              fullWidth
              type="string"
              placeholder="description"
              // error={!!errors.description}
              // helperText={errors.description ? errors.description.message : ""}
              value={state.description}
              onChange={handleChangeState}
              disabled={disabled}
            />
            <InputLabel htmlFor="publicDate">publicDate</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={publicDate}
                onChange={handleChangeDate}
                onError={(a) => {
                  console.log(a);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="publicDate"
                    fullWidth
                    required
                    // error={!!errors.publicDate}
                    // helperText={
                    //   errors.publicDate ? errors.publicDate.message : ""
                    // }
                    onChange={handleChangeState}
                    disabled={disabled}
                  />
                )}
              />
            </LocalizationProvider>
            <InputLabel id="category-id">category</InputLabel>
            <Select
              labelId="category-id"
              id="demo-simple-select-autowidth"
              value={state.category || "Coding"}
              onChange={handleChangeCategory}
              fullWidth
              disabled={disabled}
            >
              <MenuItem value={"Coding"}>Coding</MenuItem>
              <MenuItem value={"Hacking"}>Hacking</MenuItem>
              <MenuItem value={"Debuger"}>Debuger</MenuItem>
            </Select>
            <InputLabel htmlFor="page">page</InputLabel>
            <TextField
              id="page"
              name="page"
              aria-describedby="my-helper-text"
              color="primary"
              required
              fullWidth
              type="number"
              placeholder="page"
              InputProps={{ inputProps: { min: 0 } }}
              // error={!!errors.page}
              // helperText={errors.page ? errors.page.message : ""}

              value={state.page}
              onChange={handleChangeState}
              disabled={disabled}
            />

            <Button
              variant="outlined"
              type="submit"
              sx={{ marginTop: "24px" }}
              onClick={handleChangeAction}
            >
              {idItem ? (disabled ? "Edit" : "Update") : "Add"}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} justifyContent="center" paddingLeft={2}>
          <Typography
            component="h1"
            variant="h5"
            marginBottom={2}
            color="GrayText"
          >
            Upload Image
          </Typography>
          <FileUploadv2 />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Item;

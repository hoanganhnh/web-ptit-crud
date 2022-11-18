import React from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";

import axiosClient from "../services/axios-client";
import FileUploadv2 from "../components/file-upload-v2/FileUploadv2";
import { isAuthenticated } from "../stores/slices/auth";
import { useAppSelector } from "../stores";
import { IBook, IImgageBook } from "../shared/interface/book";

const validationSchema = yup.object({
  title: yup.string().required("This field is required"),
  author: yup.string().required("This field is required"),
  publicDate: yup.string().required("This field is required"),
});

function Item() {
  const [imgFile, setImgFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [publicDate, setPublicDate] = React.useState<Dayjs | null>(null);

  const { idItem } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthen = useAppSelector(isAuthenticated);

  React.useEffect(() => {
    if (!isAuthen) {
      navigate("/signin", {
        replace: true,
        state: { from: location },
      });
    }
  }, [isAuthen]);

  const handleAddImage = async (image: File) => {
    const formdata = new FormData();
    formdata.append("file", image);
    try {
      const { data } = await axiosClient.post(`books/image`, formdata);

      console.log(data);
      return data as IImgageBook;
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 413) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleUpdateImage = async (bookId: string, image: File) => {
    const formdata = new FormData();
    formdata.append("file", image);

    try {
      const { data } = await axiosClient.post(
        `books/image/${bookId}`,
        formdata
      );
      console.log(data);

      return data as IBook;
    } catch (error: any) {
      if (error.response.status === 413) {
        toast.error(error.response.data.message);
      }
    }
  };

  const addNewItem = async (data: Omit<IBook, "id" | "image">) => {
    try {
      let imageBook;
      if (imgFile !== null) {
        imageBook = await handleAddImage(imgFile);
        if (imageBook) {
          const response = await axiosClient.post("books", {
            ...data,
            imageId: imageBook.id,
          });

          if (response.status === 201) {
            navigate("/");
          }
        }
      } else {
        const response = await axiosClient.post("books", data);
        if (response.status === 201) {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateItem = async (data: Omit<IBook, "id" | "image">) => {
    try {
      if (idItem) {
        if (imgFile === null) {
          const response = await axiosClient.patch(`books/${idItem}`, data);
          if (response.status === 200) {
            console.log("update success full");
          }
        } else {
          const updateImage = await handleUpdateImage(
            idItem as string,
            imgFile
          );
          console.log(updateImage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAction = React.useCallback(() => {
    if (idItem) {
      if (disabled) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [idItem, disabled]);

  const getImageFile = (file: File) => {
    setImgFile(file);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      publicDate: "",
      page: 1,
      category: "Coding",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (idItem) {
        if (!disabled) {
          return;
        }
        updateItem(values);
      } else {
        addNewItem(values);
      }
    },
  });

  React.useEffect(() => {
    if (idItem) {
      getItemById(+idItem);
    } else {
      setDisabled(false);
    }
  }, [idItem]);

  const getItemById = async (id: number) => {
    const {
      data: { author, category, description, page, publicDate, title, image },
    }: { data: IBook } = await axiosClient.get(`books/${id}`);

    if (image) {
      setImageUrl(image.path);
    }

    formik.setValues({
      author,
      category,
      description,
      page,
      publicDate: dayjs(publicDate).format(),
      title,
    });
    setPublicDate(dayjs(publicDate));
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    formik.setFieldValue("category", event.target.value);
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setPublicDate(newValue);
    formik.setFieldValue("publicDate", dayjs(newValue).format());
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
          <Box component="form" onSubmit={formik.handleSubmit}>
            <InputLabel htmlFor="title">title</InputLabel>
            <TextField
              fullWidth
              id="title"
              name="title"
              color="primary"
              placeholder="title"
              disabled={disabled}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <InputLabel htmlFor="author">author</InputLabel>
            <TextField
              id="author"
              aria-describedby="my-helper-text"
              color="primary"
              name="author"
              fullWidth
              placeholder="author"
              disabled={disabled}
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
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
              disabled={disabled}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <InputLabel htmlFor="publicDate">publicDate</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="DD/MM/YYYY"
                disabled={disabled}
                value={publicDate}
                onChange={handleChangeDate}
                onError={(a) => {
                  console.log(a);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="publicDate"
                    required
                    fullWidth
                    disabled={disabled}
                    onChange={formik.handleChange}
                  />
                )}
              />
            </LocalizationProvider>
            <InputLabel id="category-id">category</InputLabel>
            <Select
              labelId="category-id"
              id="demo-simple-select-autowidth"
              value={formik.values.category}
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
              disabled={disabled}
              InputProps={{ inputProps: { min: 1 } }}
              value={formik.values.page}
              onChange={formik.handleChange}
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
          <FileUploadv2 url={imageUrl} getImageItem={getImageFile} />
        </Grid>
      </Grid>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}

export default Item;

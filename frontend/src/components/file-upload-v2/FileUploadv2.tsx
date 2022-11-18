import React from "react";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

import "./FileUploadv2.css";

interface FileUploadv2Props {
  accept?: string;
  url?: string;
  labelText?: string;
  getImageItem: (file: File | null) => void;
}

function FileUploadv2({
  accept = "image/*",
  labelText = "Click or drag to upload file",
  url,
  getImageItem,
}: FileUploadv2Props) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(() => url);

  React.useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files[0]) {
      const imgUrl = URL.createObjectURL(event.target.files[0]);
      setImageUrl(imgUrl);
      getImageItem(event.target.files[0]);
      //   @ts-ignore
      event.target.value = [];
    }
  };

  const onClearImg = () => {
    setImageUrl("");
    getImageItem(null);
  };

  return (
    <Box height="100%" width="100%" className={""}>
      <input
        onChange={handleChange}
        accept={accept}
        className="hidden"
        id="file-upload"
        type="file"
      />
      {imageUrl ? <ClearIcon fontSize="large" onClick={onClearImg} /> : null}
      {imageUrl ? (
        <Box position="relative">
          <img alt="file upload" src={imageUrl} className="img-preview" />
        </Box>
      ) : null}
      <label htmlFor="file-upload" className="upload-container">
        <CloudUploadIcon fontSize="large" />
        <Typography>{labelText}</Typography>
      </label>
    </Box>
  );
}

export default FileUploadv2;

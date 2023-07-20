import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
import { CircularProgress, Typography } from "@mui/material";
import FileUploadProgress from "../file-upload-progress";

interface FileSubmitProps {
  onSubmit: () => void;
  loading?: boolean;
  buttonStatus?: string;
  progress?: number;
}

const FileSubmit = ({
  onSubmit,
  loading,
  buttonStatus = "initial",
  progress = 0,
}: FileSubmitProps) => {
  const buttonText =
    buttonStatus === "uploading"
      ? "Uploading..."
      : buttonStatus === "submitting"
      ? "Submitting..."
      : "Submit Documents";
  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
      <Button
        variant="contained"
        sx={{ px: 2, py: 1.5, width: 250, height: 60 }}
        onClick={onSubmit}
        disabled={loading}
      >
        <Stack direction={`row`} spacing={3} alignItems="center">
          {progress > 0 && progress < 100 && <FileUploadProgress value={progress} />}
          {buttonStatus === "submitting" && (
            <CircularProgress color="inherit" size={35} />
          )}
          <Typography>{buttonText}</Typography>
        </Stack>
      </Button>
    </Stack>
  );
};

export default FileSubmit;

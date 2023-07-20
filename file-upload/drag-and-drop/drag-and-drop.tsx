import React, { useState } from "react";
import { useDropzone, FileRejection, FileError } from "react-dropzone";

import MarkByBatch from "./mark-by-batch/mark-by-batch";
import UploadedFiles from "./files/uploaded-files";
import BrowseFile from "./browse/browse-file";
import FileSubmit from "./submit/files-submit";
import Stack from "@mui/material/Stack";
import { bulkFileUpload } from "@api/file-upload/drag-drop";
import { Box, Button } from "@mui/material";
import { submitDocumentsStatus } from "@api/file-upload/documents-submit";
import Snackbar from "@components/common/snackbar";
import Alert from "@components/common/alert";
import { findUnselectedFields } from "@utils/bulk-upload/find-unselected-fields";

export interface SelectCategory {
  label: string;
  value: string;
}
export interface DADFile {
  file: File;
  error: FileError | FileRejection;
}
export interface UploadFiles {
  file: DADFile;
  category: SelectCategory;
  subCategory: SelectCategory;
  selected: boolean;
  progress: number;
  uploadStatus: boolean;
}

const DragAndDrop = () => {
  const [files, setFiles] = React.useState<UploadFiles[]>([]); //files
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); //snackbar
  const [errorIndex, setErrorIndex] = useState<any>([]); //display category and subcategory error
  const [maxLimitError, setMaxLimitError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buttonStatus, setButtonStatus] = useState("initial");

  const blurBackground = progress > 0 && progress < 100;

  const showMarkByBatch = files.filter((file) => file.selected).length > 0;
  const selectStatus = files.filter((file) => file.selected).length === files.length;

  const acceptingFiles = {
    "image/jpeg": [],
    "image/png": [],
    "image/jpg": [],
    "application/pdf": [],
  };
  const maxFileLimit = 100;

  const onDrop = React.useCallback(
    (accFiles: File[], FileRejection: any) => {
      console.log("accFiles", accFiles);
      const acceptedFiles = accFiles.map((file) => ({ file, errors: [] }));
      const rejectedFiles =
        FileRejection.length > 0 &&
        FileRejection.map((file: any) => ({
          error: file.errors[0].code,
        }))[0];

      // display error if the drag and drop upload exceeded the limit
      if (rejectedFiles.error && rejectedFiles.error === "too-many-files") {
        setMaxLimitError(true);
      }

      const oldFilesLength = files.length;
      const newFilesLength = acceptedFiles.length;
      const totalFilesLength = oldFilesLength + newFilesLength;

      if (totalFilesLength > maxFileLimit) {
        setMaxLimitError(true);
        return;
      }

      acceptedFiles.map((file: any) =>
        files.push({
          file: file,
          category: { label: "", value: "" },
          subCategory: { label: "", value: "" },
          selected: false,
          progress: 0,
          uploadStatus: true,
        })
      );
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptingFiles,
    maxSize: 10000000, //10MB
    maxFiles: maxFileLimit, //100 files accept in single drop
  });

  //select all checkboxes
  const selectAllHandler = () => {
    if (selectStatus) {
      const newFiles = files.map((file) => {
        return { ...file, selected: false };
      });
      setFiles(newFiles);
    } else {
      const newFiles = files.map((file) => {
        return { ...file, selected: true };
      });
      setFiles(newFiles);
    }
  };

  //delete file from list
  const onDeleteHandler = (index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  };

  //update category and subcategory value
  const onUpdateValue = (id: number, value: string | boolean, type: string) => {
    if (type === "category") {
      files[id].category.value = value as string;
      setFiles([...files]);
    }
    if (type === "subCategory") {
      files[id].subCategory.value = value as string;
      setFiles([...files]);
    }
    if (type === "checkbox") {
      files[id].selected = value as boolean;
      setFiles([...files]);
    }
  };
  // update category and subcategory value by batch
  const MarkByBatchHandler = (category: string, sub_category: string) => {
    files.map((file, index) => {
      if (file.selected) {
        file.category.value = category;
        file.subCategory.value = sub_category;
      }
    });
    setFiles([...files]);
  };
  console.log("progress", progress);

  const onSubmitHandler = () => {
    const ready = findUnselectedFields(files).length <= 0;
    if (!ready) {
      setOpen(true);
      updateUniqueErrorFields();
    }
    if (ready) {
      const formData = new FormData();
      files.map((item: any, index) => {
        formData.append("files", item.file.file);
        formData.append("category", item.category.value);
        formData.append("sub_category", item.subCategory.value);
      });

      const config = {
        onUploadProgress: (progressEvent: any) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setProgress(percentCompleted);
        },
      };
      setButtonStatus("uploading");
      bulkFileUpload(formData, config)
        .then((res) => {
          setProgress(0);
          setButtonStatus("submitting");
          submitDocumentsStatus()
            .then((res) => {
              console.log("submit", res);
              setFiles([]);
              setSuccess(true);
            })
            .catch((err) => {
              console.error(err);
              setFailed(true);
            })
            .finally(() => {
              setButtonStatus("initial");
            });
        })
        .catch((err) => console.error("err-fileupload", err));
    }
  };

  const updateUniqueErrorFields = () => {
    const uniqueFields = [...new Set(findUnselectedFields(files))];
    setErrorIndex(uniqueFields);
  };

  const handleCloseToast = () => {
    setSuccess(false);
    setFailed(false);
  };

  const handleCloseInfoMessage = () => {
    setOpen(false);
  };
  const handleCloseMaxLimitError = () => {
    setMaxLimitError(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Stack spacing={2} sx={{ opacity: blurBackground ? 0.6 : 1 }}>
        <BrowseFile getRootProps={getRootProps} getInputProps={getInputProps} />
        {maxLimitError && (
          <Alert severity="error" onClose={handleCloseMaxLimitError}>
            You can upload maximum 100 files at a time
          </Alert>
        )}

        {files.length > 1 && (
          <Stack
            direction="row-reverse"
            alignItems="flex-end"
            width={`100%`}
            height={50}
            spacing={2}
          >
            <Button
              variant="text"
              onClick={selectAllHandler}
              sx={{ textTransform: "none" }}
            >
              {selectStatus ? `Unselect All ` : `Select All`}
            </Button>
            {showMarkByBatch && <MarkByBatch onUpdate={MarkByBatchHandler} />}
          </Stack>
        )}
        {files.length > 0 && (
          <>
            <UploadedFiles
              files={files}
              onDelete={onDeleteHandler}
              onUpdate={onUpdateValue}
              errorIndex={errorIndex}
            />
            {open && (
              <Alert severity="error" onClose={handleCloseInfoMessage}>
                Please select category and sub category before submitting
              </Alert>
            )}

            <FileSubmit
              onSubmit={onSubmitHandler}
              loading={loading}
              buttonStatus={buttonStatus}
              progress={progress}
            />
          </>
        )}
        {success && (
          <Snackbar
            open={success}
            handleClose={handleCloseToast}
            severity="success"
            message="file uploaded successfully"
          />
        )}
        {failed && (
          <Snackbar
            open={success}
            handleClose={handleCloseToast}
            severity="error"
            message="error uploading"
          />
        )}
      </Stack>
    </Box>
  );
};

export default DragAndDrop;

import React from "react";
import Stack from "@mui/material/Stack";
import UploadedFileInfo from "./file/uploaded-file-info";
import { UploadFiles } from "../drag-and-drop";

interface UploadedFilesProps {
  files: UploadFiles[] | any;
  onUpdate: (id: number, value: string | boolean, type: string) => void;
  onDelete: (id: number) => void;
  errorIndex: any;
}

const UploadedFiles = ({ files, onUpdate, onDelete, errorIndex }: UploadedFilesProps) => {
  return (
    <Stack gap={3} sx={{ my: 4 }}>
      {files.map((item: any, index: number) => (
        <UploadedFileInfo
          key={index}
          onDelete={onDelete}
          onUpdate={onUpdate}
          id={index}
          fileData={item}
          uploadStatus={item.uploadStatus}
          error={errorIndex.includes(index)}
        />
      ))}
    </Stack>
  );
};
export default UploadedFiles;

import React from "react";
import ProgressCircle from "@components/common/progress/circular-progress";
import { Checkbox, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import Stack from "@mui/system/Stack";
import { Delete } from "@icons/delete";
import SelectField from "@components/common/input/select";
import { DOCUMENT_SELECTIONS } from "@utils/data/input";
import GreyBox from "@components/common/box/grey-box";
import { formatBytesToMB } from "@utils/byte-to-mb";
import ProgressBar from "@components/common/progress/progress-bar";
import CloseIcon from "@mui/icons-material/Close";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface UploadedFileInfoProps {
  fileData: any;
  onUpdate: (id: number, value: string | boolean, type: string) => void;
  onDelete: (index: number) => void;
  id: number;
  uploadStatus: boolean;
  error: boolean;
}

const UploadedFileInfo = ({
  fileData,
  onDelete,
  onUpdate,
  id,
  uploadStatus,
  error,
}: UploadedFileInfoProps) => {
  const { file: allFileInfo, category, subCategory, selected, progress } = fileData;
  const file = allFileInfo;

  const handleChange = (event: SelectChangeEvent, id: number, type: string) => {
    const value = type === "checkbox" ? !selected : event.target.value;
    onUpdate(id, value, type);
  };

  const onDeleteHandler = (id: number) => {
    onDelete(id);
  };
  const completed = uploadStatus;
  const categoriesList = DOCUMENT_SELECTIONS;
  const subCategorisList: any =
    DOCUMENT_SELECTIONS.filter((item) => {
      return item.value === category?.value;
    })[0]?.subCategory || [];

  return (
    <GreyBox error={error}>
      <Stack direction={`row`} spacing={2} justifyContent={`space-between`}>
        <Stack direction={`row`} spacing={2} alignItems={`center`}>
          <ProgressCircle value={progress} type={file.file.type} completed={completed} />
          <Stack gap={0.5}>
            <Typography variant="body1">{file.file.name} </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={4}
              sx={{ minWidth: "200px" }}
            >
              {completed ? (
                <Typography variant="caption">
                  {formatBytesToMB(file.file.size)}
                </Typography>
              ) : (
                <ProgressBar value={progress} />
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={`row`} spacing={2} alignItems={`center`}>
          {completed ? (
            <IconButton onClick={() => onDeleteHandler(id)}>
              <Delete />
            </IconButton>
          ) : (
            <IconButton onClick={() => onDeleteHandler(id)}>
              <CloseIcon />
            </IconButton>
          )}

          <Stack sx={{ minWidth: 150 }}>
            <SelectField
              name="DOCUMENT_CATEGORIES"
              id="DOCUMENT_CATEGORIES"
              value={category?.value}
              menuItems={categoriesList}
              onChange={(event) => handleChange(event, id, "category")}
              fullWidth
            />
          </Stack>
          <Stack sx={{ minWidth: 200 }}>
            <SelectField
              name="DOCUMENT_SUB_CATEGORIES"
              id="DOCUMENT_SUB_CATEGORIES"
              value={subCategory?.value}
              menuItems={subCategorisList}
              onChange={(event) => handleChange(event, id, "subCategory")}
              fullWidth
            />
          </Stack>
          <Stack width={25}>
            <Checkbox
              checked={selected}
              value={selected}
              onChange={(event) => handleChange(event, id, "checkbox")}
              {...label}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28, color: "primary.light" },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </GreyBox>
  );
};

export default UploadedFileInfo;

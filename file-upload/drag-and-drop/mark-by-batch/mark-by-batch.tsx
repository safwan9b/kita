import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
import SelectByBatch from "../select-by-batch/select-by-batch";

interface MarkByBatchProps {
  onUpdate: (category: string, sub_category: string) => void;
}

const MarkByBatch = ({ onUpdate }: MarkByBatchProps) => {
  const onUpdateBatch = (value: any) => {
    onUpdate(value.category, value.subCategory);
    // const category = "";
    // const subCategory = "";
    // ouUpdate(category, subCategory);
  };
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "primary.light",
          textTransform: "none",
          width: 190,
          height: 40,
        }}
        size="large"
      >
        Mark by Batch
      </Button>
      <SelectByBatch open={open} onClose={onClose} onSubmitValue={onUpdateBatch} />
    </>
  );
};

export default MarkByBatch;

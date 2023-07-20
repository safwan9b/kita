import React from "react";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/system/Stack";
import Typography from "@mui/material/Typography";
import { Button, SelectChangeEvent } from "@mui/material";
import {
  DOCUMENT_SUB_CATEGORIES,
  DOCUMENT_CATEGORIES,
  DOCUMENT_SELECTIONS,
} from "@utils/data/input";
import SelectField from "@components/common/input/select";
import GreyCard from "@components/common/card/grey-card";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useFormik, validateYupSchema } from "formik";
import CancelIcon from "@mui/icons-material/Cancel";

const validationSchema = yup.object({
  category: yup.string().required("Required*"),
  subCategory: yup.string().required("Required*"),
});

export interface SelectByBatchProps {
  open: boolean;
  onClose: () => void;
  onSubmitValue: (values: any) => void;
}

const SelectByBatch = ({ open, onClose, onSubmitValue }: SelectByBatchProps) => {
  const formik = useFormik({
    initialValues: {
      category: "",
      subCategory: "",
    },

    onSubmit: (values) => {
      onSubmitValue(values);
      onClose();
    },
    validationSchema: validationSchema,
  });
  const categoriesList = DOCUMENT_SELECTIONS;
  const subCategorisList: any =
    DOCUMENT_SELECTIONS.filter((item) => {
      return item.value === formik?.values?.category;
    })[0]?.subCategory || [];
  console.log(formik?.values?.category);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <Stack
        px={3}
        py={2}
        direction="row"
        alignItems={`center`}
        justifyContent="space-between"
      >
        <Typography variant="subtitle2" align="center">
          Choose files
        </Typography>
        <CancelIcon sx={{ color: "error.main", cursor: "pointer" }} onClick={onClose} />
      </Stack>

      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack width={`100%`}>
                <Typography variant="caption" align="left" gutterBottom>
                  Category
                </Typography>
                <SelectField
                  name="category"
                  id="category"
                  menuItems={categoriesList}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={
                    formik.touched.category && formik.errors.category ? "Required*" : ""
                  }
                />
              </Stack>
              <Stack width={`100%`}>
                <Typography variant="caption" align="left" gutterBottom>
                  Sub category
                </Typography>
                <SelectField
                  name="subCategory"
                  id="subCategory"
                  menuItems={subCategorisList}
                  value={formik.values.subCategory}
                  onChange={formik.handleChange}
                  error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
                  helperText={
                    formik.touched.subCategory && formik.errors.subCategory
                      ? "Required*"
                      : ""
                  }
                />
              </Stack>
            </Stack>
            <Stack alignItems={"center"}>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 1.5, width: 190 }}
                disabled={!formik.values.category || !formik.values.subCategory}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SelectByBatch;

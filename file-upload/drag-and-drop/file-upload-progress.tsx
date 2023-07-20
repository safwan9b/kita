import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface FileUploadProgress {
  value: number;
}

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} color="inherit" size={35} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="common.white"
          sx={{ fontSize: "0.65rem" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const FileUploadProgress = ({ value }: FileUploadProgress) => {
  return <CircularProgressWithLabel value={value} />;
};

export default FileUploadProgress;

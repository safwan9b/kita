import GreyBox from "@components/common/box/grey-box";
import { Upload } from "@icons/upload";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const BrowseFile = ({ getRootProps, getInputProps }: any) => {
  return (
    <div {...getRootProps()}>
      <input multiple {...getInputProps()} max={50000} />
      <Stack spacing={2}>
        <GreyBox>
          <Stack
            alignItems="center"
            direction="row"
            spacing={8}
            justifyContent="center"
            sx={{ py: 5, cursor: "pointer" }}
          >
            <Upload fontSize="large" />
            <Stack direction={`row`} alignItems={`center`} spacing={0.5}>
              <Typography color="primary.main" variant="body2" fontWeight="600">
                Browse
              </Typography>
              <Typography component="span" color="text.primary">
                or drop files here
              </Typography>
            </Stack>
          </Stack>
        </GreyBox>
        <Stack alignItems="center">
          <Typography color="error.main" variant="caption" fontWeight="400">
            Files Supported : JPEG,PNG or PDF | Maximum size: 10 MB
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default BrowseFile;

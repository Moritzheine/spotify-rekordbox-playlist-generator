import { Box, CircularProgress } from "@mui/material";
import React, { FC, ReactElement } from "react";

interface LoaderProps {
  height: number
}

const Loader: FC<LoaderProps> = ({ height }: LoaderProps): ReactElement => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height}
    >
      <CircularProgress />
    </Box>
  );
} ;

export default Loader;
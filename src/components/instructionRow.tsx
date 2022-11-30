import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement } from "react";
import { getStoreFromContext } from "../helpers";


interface InstructionRowProps {
  title: string,
  child: ReactElement
}

const InstructionRow: FC<InstructionRowProps> = (props: InstructionRowProps): ReactElement => {
  const { musicStore, spotifyStore } = getStoreFromContext();

  return (
    <Box component="div" sx={{
      display : "flex",
    }}
    >
      <Typography variant="h5" component="div">{props.title}</Typography>
      <Box sx={{
        marginLeft : 3
      }}
      >
        {props.child}
      </Box>
    </Box>
  );
};

export default observer(InstructionRow);
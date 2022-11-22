import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement } from "react";
import { getStoreFromContext } from "../helpers";


const ConvertCard: FC = (): ReactElement => {
  const { musicStore, spotifyStore } = getStoreFromContext();

  const handleSubmit = () => {
    spotifyStore.fetchPlaylists();
  };

  return (
    <>
      <Grid container sx={{ padding: 2 }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Spotify Urls"
          multiline
        />
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </Grid>
    </>
  );
};

export default observer(ConvertCard);
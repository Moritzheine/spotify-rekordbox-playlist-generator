import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement, useEffect } from "react";
import { getStoreFromContext } from "../helpers";
import ContentCard from "../shared/ContentCard";
import CollectionLoader from "./collectionLoader";
import ConvertCard from "./convertCard";
import TrackTable from "./trackTable";

const Main: FC = (): ReactElement => {
  const { spotifyStore } = getStoreFromContext();
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    if (hash) {
      const queryParameters = new URLSearchParams("?" + window.location.href.split("#")[1]);
      token = queryParameters.get("access_token");
      window.location.hash = "";
    }
    if (!token) {
      // spotifyStore.authorizeUser()
      return;
    }
    window.localStorage.setItem("token", token);
    spotifyStore.authToken = token;

  }, []);
  // spotifyStore.tokenExpiresAt = parseInt(queryParameters.get("expires_in") ?? "0") + new Date().getTime() / 1000;

  return (
    <Typography variant="h3" component="div">
        Convert Spotify playlists to Rekordbox Playlists
    </Typography>
    // <Grid container spacing={1} sx={{ padding: 10, background: "#E6E8ED" }}>
    /* <Grid item>
        <ContentCard
          title="Load Collection"
          content={<CollectionLoader />}
        />
      </Grid>

      <Grid item>

        <ContentCard
          title="Load Spotify Playlists"
          content={<TrackTable />}
        />
      </Grid>
      <Grid container sx={{ padding: 10, background: "#E6E8ED" }}>

      </Grid> */
  // </Grid>
  );
};

export default observer(Main);
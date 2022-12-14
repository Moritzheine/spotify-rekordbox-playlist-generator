import { Box, Button, Collapse, Divider, Grid, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { getStoreFromContext } from "../helpers";
import ContentCard from "../shared/ContentCard";
import CollectionLoader from "./collectionLoader";
import ConvertCard from "./convertCard";
import InstructionRow from "./instructionRow";
import PlaylistTable from "./playlistTable";

const Main: FC = (): ReactElement => {
  const { spotifyStore } = getStoreFromContext();
  const [playlistTableOpen, setPlaylistTableOpen] = useState(true);

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

  useEffect(() => {
    setPlaylistTableOpen(false);
  }, [spotifyStore.selectedPlaylistId]);

  return (
    <div style={{ width: "100%" }}>

      <Box component="div" sx={{ 
        display : "bock",
        m       : 1,
      }}>
        <Typography variant="h3" component="div" sx={{ paddingBottom: 2 }}>
          Convert Spotify playlists to Rekordbox Playlists
        </Typography>
        {spotifyStore.loggedIn ? 
          <Button variant="contained" onClick={spotifyStore.authorizeUser}>Connect to Spotify</Button> :
          <Box sx={{ display: "block" }}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h5" sx={{ marginRight: 2 }}>Welcome, {spotifyStore.user?.display_name}</Typography>
              <Button variant="contained" onClick={() => {
                spotifyStore.logOut();
              }}>Logout</Button>
            </Box>
            <Typography 
              variant="h5"
              onClick={() => setPlaylistTableOpen(!playlistTableOpen)}
            >
              Select a playlist: {spotifyStore.getPlaylistById(spotifyStore.selectedPlaylistId)?.name}
            </Typography>
            <Divider sx={{ mb: 5 }} />
            <Collapse in={playlistTableOpen} component="tr" style={{ display: "block" }}>
              <PlaylistTable />
            </Collapse>
            <CollectionLoader />
          </Box>
        }
      </Box>
    </div>
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
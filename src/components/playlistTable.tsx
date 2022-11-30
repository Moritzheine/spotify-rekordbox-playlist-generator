import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement } from "react";
import { getStoreFromContext } from "../helpers";
import Loader from "../shared/loader";

const PlaylistTable: FC = (): ReactElement => {
  const { spotifyStore } = getStoreFromContext();


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Select a playlist:</Typography>
      {/* <Button onClick={() => { spotifyStore.fetchPlaylists(); }}>Load Playlists</Button>
      <Button onClick={() => (spotifyStore.fetchUser())}>Load User</Button> */}
      {spotifyStore.playlists.length === 0 ? <React.Fragment /> :
        spotifyStore.playlistsLoading ? <Loader height={100} /> :
          <>
            <TableContainer  sx={{ minWidth: 650, maxHeight: 500 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Playlist Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {spotifyStore.playlists.map(playlist => (
                    <TableRow
                      key={playlist.href}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => spotifyStore.fetchPlaylistTracks(playlist.id)}
                      hover
                    >
                      <TableCell component="th" scope="row" >{playlist.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {
              <Typography>Loaded Playlist: {spotifyStore.getPlaylistById(spotifyStore.selectedPlaylistId)?.name}</Typography>
            }
          </>
      }
      {spotifyStore.tracksLoading ? <Loader height={100} /> : null}
    </Box>

  );
};

export default observer(PlaylistTable);
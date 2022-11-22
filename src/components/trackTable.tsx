import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement } from "react";
import { getStoreFromContext } from "../helpers";
import Loader from "../shared/loader";

const TrackTable: FC = (): ReactElement => {
  const { spotifyStore } = getStoreFromContext();


  return (
    <React.Fragment>
      <Button onClick={() => { spotifyStore.fetchPlaylists(); }}>Load Playlists</Button>
      <Button onClick={() => (spotifyStore.fetchUser())}>Load User</Button>
      {spotifyStore.playlists.length === 0 ? <React.Fragment /> :
        spotifyStore.playlistsLoading ? <Loader height={100} /> :
          <>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          </>
      }
    </React.Fragment>

  );
};

export default observer(TrackTable);
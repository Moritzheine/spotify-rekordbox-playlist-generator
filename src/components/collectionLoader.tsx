import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement } from "react";
import { getStoreFromContext } from "../helpers";


// const rex = "/\W+/g&"
const rex = "[^a-z\-]";
const removeKeyWords = ["original", "remix", "mix", "version", "dub", "feat"];

const CollectionLoader: FC = (): ReactElement => {
  const { musicStore, spotifyStore } = getStoreFromContext();
  const [downloadUrl, setDownloadUrl] = React.useState<string | undefined>(undefined);
  const [missingTracks, setMissingTracks] = React.useState<string[]>([]);

  const inputFile = React.useRef<HTMLInputElement | null>(null);
  const downloadFileLink = React.useRef<React.LegacyRef<HTMLAnchorElement> | null>(null);

  const stripTitle = (title: string) => {
    let newTitle = title.toLowerCase().replaceAll(" ", "").replaceAll("-", "").replaceAll("&", "").replaceAll("(", "").replaceAll(")", "").replaceAll("'", "").replaceAll(rex, "").replaceAll(".", "").normalize();
    removeKeyWords.forEach((word) => { newTitle = newTitle.replace(word, ""); });
    return newTitle;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null | undefined = inputFile.current?.files;
    if (!fileList || fileList.length == 0) {
      return;
    }
    const file = fileList[0];
    e.preventDefault();

    musicStore.loadCollectionXml(file);
  };

  const handleCreatePlaylist = async () => {
    console.log("Spotify Playlist length: ", spotifyStore.trackList.length);
    const results = spotifyStore.trackList.map((spotifyTrack) => {
      const res = {
        rekordboxTrack : musicStore.trackList.filter((rekordboxTrack) =>
          // spotifyTrack.name === rekordboxTrack.Name
          stripTitle(spotifyTrack.name) === stripTitle(rekordboxTrack.Name)
        ),
        spotifyTrack : spotifyTrack
      };
      return res;
    }
    );
    const unsure = results.filter((e) => e.rekordboxTrack.length > 1)
      .map((e) => {
        return { spotify: e.spotifyTrack.name + " - " + e.spotifyTrack.artists.map((e) => e.name).join(), rekordbox: e.rekordboxTrack.map((e) => e.Name) };
      });
    console.log("Unsure: ", unsure);
    const missing = results.filter((e) => e.rekordboxTrack.length === 0)
      .map((e) => {
        return e.spotifyTrack.external_urls.spotify;
        // return stripTitle(e.spotifyTrack.name)
      });
    console.log(`Could not Link ${missing.length} Tracks:`);
    console.log(missing);
    setMissingTracks(missing);
    const trackList = results.map(r => r.rekordboxTrack[0]).filter(r => r !== undefined);
    // console.log(trackList)
    musicStore.generatePlaylist("myNewPlaylist", trackList);
  };

  return (
    <>
      <Card>
        <input
          type="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e) => handleFileSelect(e)}
          accept="text/xml"
        />
        <Button
          onClick={() => {
            inputFile?.current?.click();
          }}
        >Load Collection</Button>
        {musicStore.trackList.length > 0 ? (
          <>
            <Typography>Tracks in Collection: {musicStore.trackList.length}</Typography>
            <Button
              onClick={() => {
                handleCreatePlaylist();
              }}
            >Create Playlist</Button>
          </>
        ) : null}
        <TextField multiline value={missingTracks.join("\n")} />
      </Card>
    </>
  );
};

export default observer(CollectionLoader);
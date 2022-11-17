import { makeAutoObservable } from "mobx";
import Track from "../models/track/track";
import { playlist } from "../constants/playlist";
import { getStoreFromContext } from "../helpers";
import { SpotifyStore } from "./spotifyStore";
import { unescape } from "querystring";


export class MusicStore {
  
  private _trackList: Track[] = [];
  
  constructor() {
    makeAutoObservable(this);
    this.loadMockPlaylist();
    // this.getToken()
  }

  loadMockPlaylist() {
    playlist.split("#").forEach((val) => {
      const lines = val.split("\n");
      const metaData = lines[0];
      const path = lines[1];
      // const track = new RekordboxTrack({ header: metaData, filePath: path });
      // this.trackList.push(track);
    });
  }

  loadCollectionXml(file: File) {
    const parser = new DOMParser();
    const reader = new FileReader()

    reader.onload = async (e) => {
      if (e.target === null) return
      const text = (e.target.result)?.toString() ?? ""
      const xml = parser.parseFromString(text, "text/xml");
      const collection = xml.getElementsByTagName("COLLECTION")[0];
      // console.log(collection)
      // setTrackNumber(collection.attributes.getNamedItem("Entries")?.textContent)
      const tracks = Array.from(collection.getElementsByTagName("TRACK"))
      console.log(tracks[0].getAttributeNames())
      this.trackList = tracks.map((track) => {
        return new Track({
          Name: track.getAttribute("Name") ?? "",
          Artist: track.getAttribute("Artist"),
          TotalTime: track.getAttribute("TotalTime"),
          Location: decodeURIComponent(track.getAttribute("Location")?.replace("file://localhost", "") ?? ""),
        });
      })
    };
    reader.readAsText(file)
  }

  generatePlaylist(fileName: string, tracks: Track[]) {
    // Download it
    const data = "#EXTM3U" + tracks.map(track => 
      track.toM3U8()
    ).join("")
    console.log(data)
    const blob = new Blob([data]);
    const fileDownloadUrl = URL.createObjectURL(blob);

    // Create blob link to download
    const link = document.createElement('a');
    link.href = fileDownloadUrl;
    link.setAttribute(
      'download',
      fileName+".m3u8",
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
  }

  public get trackList(): Track[] {
    return this._trackList;
  }
  public set trackList(v: Track[]) {
    this._trackList = v;
  }
}
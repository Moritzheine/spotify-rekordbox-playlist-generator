import React from "react";
import { MusicStore } from "./musicStore";
import { SpotifyStore } from "./spotifyStore";


export class RootStore {
  private readonly _musicStore: MusicStore = new MusicStore();
  private readonly _spotifyStore: SpotifyStore = new SpotifyStore();

  get musicStore(): MusicStore {
    return this._musicStore;
  }

  get spotifyStore(): SpotifyStore {
    return this._spotifyStore;
  }
}

export const StoreContext = React.createContext<RootStore | null>(null);
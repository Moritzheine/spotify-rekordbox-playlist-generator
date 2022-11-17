import Track from "./track";

interface ISpotifyTrack {
  spotifyUrl: string
}
  
export class SpotifyTrack extends Track implements ISpotifyTrack {
  private _spotifyUrl = "";
  
  constructor({ spotifyUrl }: ISpotifyTrack) {
    super({});
    this.spotifyUrl = spotifyUrl;
  }

  public get spotifyUrl() : string {
    return this._spotifyUrl;
  }
  public set spotifyUrl(v : string) {
    this._spotifyUrl = v;
  }
}
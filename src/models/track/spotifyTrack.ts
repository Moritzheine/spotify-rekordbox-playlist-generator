interface ISpotifyTrack {
  spotifyUrl: string
}
  
export default class SpotifyTrack implements ISpotifyTrack {
  private _spotifyUrl = "";
  
  constructor({ spotifyUrl }: ISpotifyTrack) {
    this.spotifyUrl = spotifyUrl;
  }

  public get spotifyUrl() : string {
    return this._spotifyUrl;
  }
  public set spotifyUrl(v : string) {
    this._spotifyUrl = v;
  }
}
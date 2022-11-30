import { makeAutoObservable } from "mobx";
import SpotifyWebApi from "spotify-web-api-node";


export class SpotifyStore {
  private _trackList: SpotifyApi.TrackObjectFull[] = [];
  private spotifyApi: SpotifyWebApi;
  private _authToken: string | undefined = undefined;
  private _playlists: SpotifyApi.PlaylistObjectSimplified[] = []
  private _selectedPlaylistId = "";
  private _playlistsLoading = false;
  private _userLoading = false;
  private _tracksLoading = false;
  private _user: SpotifyApi.CurrentUsersProfileResponse | undefined = undefined;
  private _tokenExpiresAt = 0;

  private CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  private REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
  private AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  private RESPONSE_TYPE = "token"
  private SCOPES = ["playlist-read-private"]

  constructor() {
    makeAutoObservable(this);
    this.spotifyApi = new SpotifyWebApi();
  }


  tokenExpired(): boolean {
    if (this.authToken === undefined) return true;
    if (this.tokenExpiresAt < new Date().getTime() / 1000) return true;
    return false;
  }

  authorizeUser = async () => {
    console.log("Redirecting to spotify authorization...");
    window.location.href = this.authUrl();
  }

  logOut() {
    this.authToken = undefined;
    window.localStorage.removeItem("token");
    // window.location.reload();
  }

  get loggedIn() {
    return this.authToken === undefined;
  }

  async fetchPlaylists(): Promise<void> {
    if (this.playlistsLoading) return;
    this.playlistsLoading = true;
    console.log("Fetching Playlists...");
    this.spotifyApi.getUserPlaylists()
      .then((response) => {
        const playlists = response.body.items;
        console.log(playlists.map((e) => e.name));
        this.playlists = playlists;
      })
      .catch((err) => {
        console.error(err);
        this.logOut();
      })
      .finally(() => {
        this.playlistsLoading = false;
      });
  }

  async fetchUser(): Promise<void> {
    if (this.userLoading) return;
    if (this.tokenExpired()) this.authorizeUser(); 
    this.userLoading = true;
    console.log("Fetching User...");
    return this.spotifyApi.getMe()
      .then((response) => {
        // if (response.statusCode !== 200) {
        //   this.logOut();
        // }
        const me = response.body;
        console.log(me);
        this.user = me;
      })
      .catch((err) => {
        console.error(err);
        this.logOut();
      })
      .finally(() => {
        this.userLoading = false;
      });
  }

  async fetchPlaylistTracks(playlistId: string): Promise<void> {
    if (this.tracksLoading) return;
    this.selectedPlaylistId = playlistId;
    this.tracksLoading = true;
    console.log("Fetching Tracks...");
    return this.spotifyApi.getPlaylistTracks(playlistId)
      .then((response) => {
        // if (response.statusCode !== 200) {
        //   this.logOut();
        // }
        this.trackList = response.body.items.flatMap((track) => track.track ? [track.track] : []);
        console.log(this.trackList.map((t) => t.name));
      })
      .catch((err) => {
        console.error(err);
        this.logOut();
      })
      .finally(() => {
        this.tracksLoading = false;
      });
  }

  loadData() {
    if (!this.playlists) this.fetchPlaylists();
  }

  authUrl() {
    const authorizeURL = `${this.AUTH_ENDPOINT}?client_id=${this.CLIENT_ID}&response_type=${this.RESPONSE_TYPE}&redirect_uri=${this.REDIRECT_URI}&scope=${this.SCOPES.join("%20")}&show_dialog=true`;
    console.log(authorizeURL);
    return authorizeURL;
  }

  getPlaylistById(id: string) {
    return this.playlists.find(playlist => playlist.id === id);
  }

  get authToken() {
    return this._authToken;
  }

  set authToken(token: string | undefined) {
    console.log("Token set to: ", token);
    this._authToken = token;
    if (!token) return;
    this.spotifyApi.setAccessToken(token);
    this.tokenExpiresAt = new Date().getTime() / 1000 + 3600;

    if (!this.user) this.fetchUser();
    if (this.playlists.length == 0) this.fetchPlaylists();
  }

  public get user(): SpotifyApi.CurrentUsersProfileResponse | undefined {
    return this._user;
  }
  public set user(v: SpotifyApi.CurrentUsersProfileResponse | undefined) {
    this._user = v;
  }

  public get tracksLoading(): boolean {
    return this._tracksLoading;
  }
  public set tracksLoading(v: boolean) {
    this._tracksLoading = v;
  }

  public get userLoading(): boolean {
    return this._userLoading;
  }
  public set userLoading(v: boolean) {
    this._userLoading = v;
  }

  public get tokenExpiresAt(): number {
    return this._tokenExpiresAt;
  }
  public set tokenExpiresAt(v: number) {
    this._tokenExpiresAt = v;
  }

  public get playlists(): SpotifyApi.PlaylistObjectSimplified[] {
    return this._playlists;
  }
  public set playlists(v: SpotifyApi.PlaylistObjectSimplified[]) {
    this._playlists = v;
  }

  public get trackList(): SpotifyApi.TrackObjectFull[] {
    return this._trackList;
  }
  public set trackList(v: SpotifyApi.TrackObjectFull[]) {
    this._trackList = v;
  }

  public get playlistsLoading(): boolean {
    return this._playlistsLoading;
  }
  public set playlistsLoading(v: boolean) {
    this._playlistsLoading = v;
  }

  public get selectedPlaylistId(): string {
    return this._selectedPlaylistId;
  }
  public set selectedPlaylistId(v: string) {
    this._selectedPlaylistId = v;
  }
}
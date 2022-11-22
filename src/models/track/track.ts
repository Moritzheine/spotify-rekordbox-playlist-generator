
// export interface ITrack {
//   title?: string,
//   artist?: string,
//   duration?: number,
//   location?: string,
// }

interface ITrack {
  TrackID?: string | null,
  Name: string,
  Artist?: string | null,
  Composer?: string | null,
  Album?: string | null,
  Grouping?: string | null,
  Genre?: string | null,
  Kind?: string | null,
  Size?: string | null,
  DiscNumber?: string | null,
  TrackNumber?: string | null,
  Year?: string | null,
  AverageBpm?: string | null,
  DateAdded?: string | null,
  BitRate?: string | null,
  SampleRate?: string | null,
  Comments?: string | null,
  PlayCount?: string | null,
  Rating?: string | null,
  Location?: string | null,
  Remixer?: string | null,
  Tonality?: string | null,
  Label?: string | null,
  Mix?: string | null
  TotalTime?: string | null
}

export default class Track implements ITrack {
  Name: string
  Artist?: string | null | undefined
  Location?: string | null | undefined
  TotalTime?: string | null | undefined

  constructor({ Name, Artist, Location, TotalTime }: ITrack) {
    this.Name = Name;
    this.Artist = Artist;
    this.Location = Location;
    this.TotalTime = TotalTime;
  }

  toM3U8(): string {
    return `#EXTINF:${this.TotalTime},${this.Artist} - ${this.Name}\n${this.Location}\n`;
  }
}
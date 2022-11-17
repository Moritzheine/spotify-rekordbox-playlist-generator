// import Track from "./track";

// interface IRekordboxTrack {
//   header: string,
//   filePath: string,
// }
  
// export class RekordboxTrack extends Track implements IRekordboxTrack {
//   header: string;
//   filePath: string;
  
//   constructor({ filePath, header }: IRekordboxTrack) {
//     super({});
//     this.filePath = filePath;
//     this.header = header;
//     // #EXTINF:493,Coss, Iorie - Getsuyõ
  
//     const data = this.header.split(",");
//     this.duration = parseInt(data[0].split(":")[1]);
//     const restString = this.header.slice(this.header.indexOf(this.duration.toString())+this.duration.toString().length+1);
//     const stringSplit = restString.split("-");
//     this.artist = stringSplit[0];
//     delete stringSplit[0];
//     this.title = stringSplit.filter((e) => e.length > 1).join("-");
//     // console.log(this.title, this.artist, this.duration);
//   }
// }
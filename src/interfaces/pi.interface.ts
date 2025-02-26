export interface IPi {
  _id: number,
  authNumber: String,
  captors: {
    captorid: number,
    humidity: number;
  }[];
}
  
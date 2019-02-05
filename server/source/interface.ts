
export enum Status {
  SUCCESS = 1,
  FAILURE = 0,
}


export interface Response {
  status: Status,
  payload?: any,
	message? : string
}
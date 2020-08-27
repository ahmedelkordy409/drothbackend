export interface IUser {
  _id: String;
  name: String;
  email: String;
  password: String;
  rooms: string[];
  email_verified: Boolean;
  last_ip: String;
  is_blocked: Boolean;
  block_reason: String;
 // role: String;
  token: String;
}



export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}

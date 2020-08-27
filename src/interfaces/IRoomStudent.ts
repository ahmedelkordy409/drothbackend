export interface IRoomStudent {
  _id:  String;
  student:  String;
  room :  String;     // ref to room docs

  isApproved: boolean;

  AuthorizeKey: String; // jwt token with data
}


/*
export interface IRoomStudentInputDTO {
  summary: String; // tittle
}
*/

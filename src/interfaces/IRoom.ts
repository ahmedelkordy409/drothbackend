export interface IRoom {
  _id: String;
  teacher: String;
  tittle: String;
  cover: String;
  description: String;
  students: Student[];
}


export interface Student {
       _id: String;
       name: String;
       avatar: String;
       isApproved: Boolean;
}



export interface IRoomInputDTO {
  tittle: String,
  cover: String,
  description: String,
}

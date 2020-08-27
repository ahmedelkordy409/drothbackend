import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IRoom } from '../interfaces/IRoom';





const roomSchema: Schema = new Schema({
  tittle:  String,
  cover:  String,
  description: String,


 // room user management
  teacher: { type: Schema.Types.ObjectId, ref: 'User' }, // ref to user docs to my own room
  students: [{ type: Schema.Types.ObjectId, ref: 'RoomStudent' }],


 // room controll
  isDeleted: {type: Boolean, default: false},



 // time stamp


});

export default mongoose.model<IRoom & mongoose.Document>('Room', roomSchema);

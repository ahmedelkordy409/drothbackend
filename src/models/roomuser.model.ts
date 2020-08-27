import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IRoomStudent } from '../interfaces/IRoomStudent';




const roomStudentSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Person' },  // ref to user docs
  room : { type: Schema.Types.ObjectId, ref: 'Room' },     // ref to room docs

  isApproved: {
               type: Boolean,
               default: false
              },

  AuthorizeKey: String, // jwt token with data

//  isPaied: { type: Boolean,   default: false  },  // ref to payments docs

// timeStamp:
});

export default mongoose.model<IRoomStudent & mongoose.Document>('RoomStudent', roomStudentSchema);

import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IWorkspaceUser } from '../interfaces';





const workspacesUserSchema: Schema = new Schema({


  /*
   *acsses control
  */
  role: String,
  primission: [String],




  /*
   *control variables
  */
  jointAt: String,
  //jointAt: String;
  leaveAt: String,
  isDeleted: Boolean,




  /// relationship
  workspace: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]

});

export default mongoose.model<IWorkspaceUser & mongoose.Document>('Workspace', workspacesUserSchema);

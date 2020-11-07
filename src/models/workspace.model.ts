import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IWorkspace } from '../interfaces';

const workspaceSchema: Schema = new Schema({
  tittle: String,
  cover: String,
  image: String,

  // course controll
  isDeleted: { type: Boolean, default: false },

  // relationship
  orgnizations: [{ type: Schema.Types.ObjectId, ref: 'Orgnization' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IWorkspace & mongoose.Document>(
  'Workspac',
  workspaceSchema
);

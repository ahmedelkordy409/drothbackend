import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IUser } from '../interfaces/IUser';

const orgnizationSchema: Schema = new Schema({

  /// relationship
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
});

export default mongoose.model<IUser & mongoose.Document>(
  'Orgnization',
  orgnizationSchema
);

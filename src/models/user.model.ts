import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IUser } from '../interfaces/IUser';

const profileSchema: Schema = new Schema({
  frist_name: String,
  middle_name: String,
  last_name: String,
  avatar: String,
  telephone: String,
  country: String,
  zipcode: String,
  is_complete: { type: Boolean, default: false },
});

const securitySchema: Schema = new Schema({
  email_verified: { type: Boolean, default: false },
  is_profile_complete: { type: Boolean, default: false },
  last_ip: { type: String },
  is_blocked: { type: Boolean, default: false },
  block_reason: { type: String },
  last_login: Date,
  last_password_reset: Date,
  /*
    logins_count:	'integer',
    multifactor:	'text',
    name:	'text',
    nickname:	'text',
    picture: 'text',
    username:,
    family_name: 'text',
    given_name: 'text',

*/
});

const appMetadataSchema: Schema = new Schema({
  country: String,
  timezone: String,
  //dateReltion
});

const userMetadataSchema: Schema = new Schema({
  role: String,
  plan_type: String,
  account_type: {
    type: String,
    enum: ['manager', 'specilst', 'family'], // Possible values: user | admin
    default: 'family',
  },
});

const userSchema: Schema = new Schema({
  //  name: { type: String, required: true, trim: true },

  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minLength: 7 },
  salt: { type: String, required: true },
  is_online: { type: Boolean, default: false },

  profile: profileSchema,

  security: securitySchema,

  app_metadata: appMetadataSchema,

  user_metadata: userMetadataSchema,

  /// relationship
  Workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
  orgnizations: [{ type: Schema.Types.ObjectId, ref: 'Orgnization' }],
});

export default mongoose.model<IUser & mongoose.Document>('User', userSchema);

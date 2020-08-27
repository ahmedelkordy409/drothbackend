import mongoose, { Schema } from 'mongoose';
//import validator from 'validator';
import { IUser } from '../interfaces/IUser';

const userSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },

  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minLength: 7 },

  //  who create rooms {teacher role }
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],

  payments: [{ type: Schema.Types.ObjectId, ref: 'Payments' }],

  email_verified: { type: Boolean, default: false },
  is_profile_complete: { type: Boolean, default: false },
  last_ip: { type: String },
  is_blocked: { type: Boolean, default: false },
  block_reason: { type: String },
  last_login: Date,
  last_password_reset: Date,

  is_online: { type: Boolean, default: false },

  app_metadata: {
    country: String,
    timezone: String,
  },

  user_metadata: {
    role: String,
    plan_type: String,
  },

  salt: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: 'user', // Possible values: user | admin
  },

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

  token: String,
  /*  tokens: [{
       device_id: {type: Boolean,default: false},
       token: {type: String,required: true}
   }]*/
});

export default mongoose.model<IUser & mongoose.Document>('User', userSchema);

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 7 },
    //  who create rooms {teacher role }
    rooms: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' }],
    // univirsy that teacher work on
    // payments: [{ type: Schema.Types.ObjectId, ref: 'Payments' }],
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
        enum: [
            'manager',
            'specilst',
            'family'
        ],
        default: "family"
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
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map
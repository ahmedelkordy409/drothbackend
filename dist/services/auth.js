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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import config from '../config';
const user_model_1 = __importDefault(require("../models/user.model"));
const argon2 = __importStar(require("argon2"));
const crypto_1 = require("crypto");
/*
* https://dev.to/gokayokyay/api-authentication-workflow-with-jwt-and-refresh-tokens-5312
*
*
*
**/
let AuthService = class AuthService {
    //constructor(@Inject('userModel') private userModel: Models.UserModel) {}
    constructor() { }
    SignUp(userInputDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = crypto_1.randomBytes(32);
                console.log('salt genrated sassfullt', salt);
                const hashedPassword = yield argon2.hash(userInputDTO.password, { salt });
                console.log('password hashing sucssfully :', hashedPassword);
                const saltVar = salt.toString('hex');
                const userRecord = yield user_model_1.default.create(Object.assign(Object.assign({}, userInputDTO), { salt: saltVar, password: hashedPassword }));
                console.log('new user creation sucssfully:', userRecord);
                if (!userRecord) {
                    throw new Error('User cannot be created');
                }
                const token = this.generateToken(userRecord);
                console.log('token generate sucssfully:', token);
                const user = userRecord.toObject();
                Reflect.deleteProperty(user, 'password');
                Reflect.deleteProperty(user, 'salt');
                console.log('token generate sucssfully:', user);
                return Object.assign(Object.assign({}, user), { token });
            }
            catch (e) {
                throw e;
            }
        });
    }
    SignIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield user_model_1.default.findOne({ email });
            if (!userRecord) {
                throw new Error('User not registered');
            }
            /**
             * We use verify from argon2 to prevent 'timing based' attacks
             */
            console.log('userRecord is work', userRecord.password);
            const pass = userRecord.password.toString();
            console.log('hashed Password', pass);
            const validPassword = yield argon2.verify(pass, password);
            console.log('validPassword is work', validPassword);
            if (validPassword) {
                const token = this.generateToken(userRecord);
                console.log('token generate sucssfully:', token);
                const user = userRecord.toObject();
                Reflect.deleteProperty(user, 'password');
                Reflect.deleteProperty(user, 'salt');
                console.log('token generate sucssfully:', user);
                return Object.assign(Object.assign({}, user), { token });
                /*      const token = this.generateToken(userRecord);
                console.log('token is genrated sucssfully', token);
          
              const user = userRecord;//.toObject();
              //  Reflect.deleteProperty(user, 'password');
              //  Reflect.deleteProperty(user, 'salt');
            //    console.log('remove sensetive data from returned user', user);
          
                return { ...user, token };*/
            }
            else {
                throw new Error('Invalid Password');
            }
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenVerify = jsonwebtoken_1.default.verify(token, 'jghj5s5df4sd5f46s5df4sd5f');
                //  console.log('++ tokenVerify work :', tokenVerify);
                const userRecord = yield user_model_1.default.findOne({
                    _id: tokenVerify._id.toString(),
                });
                //  console.log('+++ userRecord work :', userRecord);
                if (!userRecord) {
                    throw new Error('User not registered');
                }
                /**
                 * We use verify from argon2 to prevent 'timing based' attacks
                 */
                const user = userRecord.toObject();
                Reflect.deleteProperty(user, 'password');
                Reflect.deleteProperty(user, 'salt');
                return {
                    user,
                    isLogin: true,
                };
            }
            catch (error) {
                throw new Error('Authentication token is invalid, please log in.');
            }
        });
    }
    generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https://softwareontheroad.com/you-dont-need-passport
         */
        return jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
            exp: exp.getTime() / 1000,
        }, 
        //config.jwtSecret
        'jghj5s5df4sd5f46s5df4sd5f');
    }
    createSession(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = this.generateToken(user);
                console.log('+++token generate sucssfully:', token);
                const idString = user._id.toString();
                const sessionAdd = yield user_model_1.default.updateOne({ _id: idString }, { token: token });
                console.log('++++ sessionAdd sucssfully:', sessionAdd);
                return sessionAdd;
            }
            catch (e) {
                throw e;
            }
        });
    }
};
AuthService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.js.map
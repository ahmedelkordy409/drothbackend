import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
//import config from '../config';
import UserModel from '../models/user.model';

import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '../interfaces/IUser';

/*
* https://dev.to/gokayokyay/api-authentication-workflow-with-jwt-and-refresh-tokens-5312
*
*
*
**/






@Service()
export default class AuthService {
  //constructor(@Inject('userModel') private userModel: Models.UserModel) {}
  constructor() {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      console.log('salt genrated sassfullt', salt);

      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      console.log('password hashing sucssfully :', hashedPassword);

      const userRecord = await UserModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
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
      return {
        ...user,
        token,
      };
    } catch (e) {
      throw e;
    }
  }

  public async SignIn(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    console.log('userRecord is work', userRecord.password);

    const pass: string = userRecord.password.toString();
    console.log('hashed Password', pass);

    const validPassword = await argon2.verify(pass, password);
    console.log('validPassword is work', validPassword);

    if (validPassword) {
      const token = this.generateToken(userRecord);
      console.log('token generate sucssfully:', token);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      console.log('token generate sucssfully:', user);
      return {
        ...user,
        token,
      };

      /*      const token = this.generateToken(userRecord);
      console.log('token is genrated sucssfully', token);

    const user = userRecord;//.toObject();
    //  Reflect.deleteProperty(user, 'password');
    //  Reflect.deleteProperty(user, 'salt');
  //    console.log('remove sensetive data from returned user', user);

      return { ...user, token };*/
    } else {
      throw new Error('Invalid Password');
    }
  }

  public async getUserByToken(
    token: string
  ): Promise<{ user: IUser; isLogin: Boolean }> {
    try {
      const tokenVerify = jwt.verify(token, 'jghj5s5df4sd5f46s5df4sd5f');
    //  console.log('++ tokenVerify work :', tokenVerify);
      const userRecord = await UserModel.findOne({
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
    } catch (error) {
      throw new Error('Authentication token is invalid, please log in.');
    }
  }

  private generateToken(user: any) {
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
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        email: user.email,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      //config.jwtSecret
      'jghj5s5df4sd5f46s5df4sd5f'
    );
  }

  private async createSession(user: any) {
    try {
      const token = this.generateToken(user);
      console.log('+++token generate sucssfully:', token);

      const idString = user._id.toString();
      const sessionAdd = await UserModel.updateOne(
        { _id: idString },
        { token: token }
      );

      console.log('++++ sessionAdd sucssfully:', sessionAdd);

      return sessionAdd;
    } catch (e) {
      throw e;
    }
  }
}

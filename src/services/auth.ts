'use strict';
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';

import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

import { IUser, IUserInputDTO } from '../interfaces/IUser';
import UserModel from '../models/user.model';

/*
 * https://dev.to/gokayokyay/api-authentication-workflow-with-jwt-and-refresh-tokens-5312
 *
 *
 *
 **/

@Service()
export default class AuthService {
  constructor() {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      console.log('salt genrated sassfullt', salt);

      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      console.log('password hashing sucssfully :', hashedPassword);

      const saltVar = salt.toString('hex');

      ///const hashPassword = new PasswordHashing(userInputDTO.password);

      const input = {
        ...userInputDTO,
        salt: saltVar, //hashPassword.saltString
        password: hashedPassword, //hashPassword.hashedPassword
      };
      console.log('input sucssfully :', input);

      const userRecord = await UserModel.create(input);
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

    const userPassword: any = userRecord.password; /*.toString()*/
    console.log('hashed Password', userPassword);

    const validPassword = await argon2.verify(userPassword, password);
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
      const tokenVerify = <any>jwt.verify(token, 'jghj5s5df4sd5f46s5df4sd5f');
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
}

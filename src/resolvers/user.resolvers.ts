import { IUser, IUserInputDTO } from '../interfaces/IUser';
import AuthService from '../services/auth';
import { Container } from 'typedi';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const userResolvers = {
  Query: {
    me: (parent: any, args: any, context: any, info: any) => {
      if (!context.user) {
        return Error('you arent login');
      }
      return context.user;
    },
  },
  Mutation: {
    login: async (parent: any, args: any, context: any, info: any) => {
      try {
        const { email, password } = args;
        const authServiceInstance = Container.get(AuthService);
        const user = await authServiceInstance.SignIn(email, password);
        console.log(user);
        return user;
      } catch (e) {
        return new Error(e);
      }
    },
    singup: async (parent: any, args: any, context: any, info: any) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        const user = await authServiceInstance.SignUp(args as IUserInputDTO);
        console.log('authServiceInstance is sucsses', user);
        return user;
      } catch (e) {
        return new Error(e);
      }
    },
  },
};

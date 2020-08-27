import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import AuthService from './services/auth';
import { Container } from 'typedi';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
//import Express from 'express';
import 'reflect-metadata';
import { connect } from 'mongoose';

// create mongoose connection
const mongoose = connect(
  'mongodb+srv://elkordy:xUkBU7bfnZAfj.y@cluster0-6afpi.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    try {
      const token = req.headers.authorization.replace('Bearer ', '') || '';

      console.log(token);


      if (token) {
        const authServiceInstance = Container.get(AuthService);
        return authServiceInstance.getUserByToken(token);
      } else {
        return {
          user: undefined,
          isLogin: false,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  },
});
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 3333 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

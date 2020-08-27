"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const auth_1 = __importDefault(require("./services/auth"));
const typedi_1 = require("typedi");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
//import Express from 'express';
require("reflect-metadata");
const mongoose_1 = require("mongoose");
// create mongoose connection
const mongoose = mongoose_1.connect('mongodb+srv://elkordy:xUkBU7bfnZAfj.y@cluster0-6afpi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: ({ req }) => {
        // get the user token from the headers
        try {
            const token = req.headers.authorization.replace('Bearer ', '') || '';
            console.log(token);
            if (token) {
                const authServiceInstance = typedi_1.Container.get(auth_1.default);
                return authServiceInstance.getUserByToken(token);
            }
            else {
                return {
                    user: undefined,
                    isLogin: false,
                };
            }
        }
        catch (error) {
            throw new Error(error);
        }
    },
});
const app = express_1.default();
server.applyMiddleware({ app });
app.listen({ port: 3333 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=server.js.map
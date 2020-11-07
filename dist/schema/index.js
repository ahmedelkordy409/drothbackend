"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
# @ Error handle https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/


# -------------------------
# !!!    USER TYPES     !!!
# -------------------------
  type User {
    _id: String
    name: String!
    email: String!
    password: String!
    role: String!
    email_verified: Boolean!
    last_ip: String
    is_blocked: Boolean!
    token: String
    rooms: [Room]
  }






# """""""""""   """""""""""
# """   ROOM TYPES    """
# """""""""""   """""""""""

type Room {
  _id: String

  tittle: String
  cover: String
  image: String
}










  # The "Query" type is special: it lists all of the available queries that
  type Query {
    # FOR USER
    me: User
    AllUsers:[User]



    # FOR Course
    # myRooms: Course!
    # categroyCourse(category: String!): Course
    # Tagcourse(category: tags!): Course
    # courseInfo(slug:String!): Course!
    # course(id:ID): Course!
    # course(id:ID): Course!



  }



  type Mutation {
    # FOR USER
    login(email: String!, password:String!): User!
    singup(name: String!,role: String!,email: String!, password:String!):User


    # FOR Course
    createRoom(tittle: String ,cover: String ,image: String ): Room!

    # JointRoom(id:ID!): String!
    # addUserRoom(id:ID!): String!


  }
`;
//# sourceMappingURL=index.js.map
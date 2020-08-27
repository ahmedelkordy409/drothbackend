"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.apollo-server-express
exports.typeDefs = apollo_server_1.gql `
  # @ Error handle https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/

  """ user define """

  #scalar DateTime

    type User {
      _id: ID!
      name: String!
      email: String!
      password: String!
      email_verified: Boolean!
      last_ip: String
      is_blocked: Boolean!
      token: String
      rooms: [Room]
    }





    """ session management define """


    type CalDate {
        date: String
        dateTime: String
        timeZone: String
    }


    type Session {
      id: ID!
      summary: String!
      location: String!
      description: String!
      start: CalDate!
      end: CalDate!
      attendees: [Attendees]
    }


    type Attendees {
      #  id: ID!
        email: String!
      #  displayName: String
      #  organizer: Boolean
      #  self: Boolean
      #  resource: Boolean
      #  optional: Boolean
      #  responseStatus: String
      #  comment: String
      #  additionalGuests: Number
    }




   """ ROOM TYPES  """

    type Room {
      _id: String
      teacher: String
      tittle: String
      cover: String
      description: String
      students: [Student]
    }


    type Student {
      _id: String
      name: String
      avatar: String
      isApproved: Boolean
    }







  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    # FOR USER
    me: User
    AllUsers:[User]

    # FOR SESSION
    #getEvent():Session
    #getEventList:[Session]



    # FOR ROOM
    my_rooms: User








     #room_student



  }



  type Mutation {
    # FOR USER
    login(email: String!, password:String!): User!
    singup(name: String!,email: String!, password:String!):User
    #password_reset()
    #create_profile()
    #updateProfile()


    # FOR SESSION
    session_create(summary: String, location: String, description: String ):Session
    #session_update():Session
    #session_delete():Session
    #session_watch():Session



    # FOR ROOM
     room_create(tittle: String,cover: String,description: String):Room
     room_update(roomid: ID!):Room
     room_delete(roomid: ID!):Room



     # FOR ROOM User Management
     student_join(roomid: ID!):Student
     student_reject(roomid: ID!,roomstudentId: ID!):Student
     student_approve(roomid: ID!,roomstudentId: ID!):Student




  }
`;
//# sourceMappingURL=index.js.map
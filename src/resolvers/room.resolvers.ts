import { IRoom } from '../interfaces/IRoom';
import { IUser } from '../interfaces/IUser';

import RoomService from '../services/room';
import { Container } from 'typedi';



export const roomResolvers = {

  Query: {

  my_rooms: async (parent: any, args: any, context: any, info: any) => {

  /*
  * sould auth
  * should be teacher role
  *
  */

    if (!context.user) {
      throw new Error('you arent login');
    } else {
        console.log(context.user._id);
        try {
          console.log({ teacher: context.user._id });
          const roomServiceInstance = Container.get(RoomService);
          const rooms = await roomServiceInstance.GetRooms(context.user._id);
          console.log(rooms);
          return rooms;
        } catch (e) {
          throw new Error(e);
        }
    }

  },





},

  Mutation: {
    room_create: async (parent: any, args: any, context: any, info: any) => {

    /*
    * sould auth
    * should be teacher role
    *
    */

      if (!context.user) {
        throw new Error('you arent login');
      } else {
          console.log(context.user._id);
          try {
            console.log({...args, teacher: context.user._id });
            const roomServiceInstance = Container.get(RoomService);
            const room = await roomServiceInstance.CreateRoom({...args, teacher: context.user._id } as IRoom);
            console.log(room);
            return room;
          } catch (e) {
            throw new Error(e);
          }
      }

    },


/**********************************************************
* for room student management
***********************************************************/

room_update: async (parent: any, args: any, context: any, info: any) => {



  /*
  * sould auth
  * should be teacher role && room owner
  *
  */


  // User AUTH check
  if (!context.user) {
    throw new Error('you arent login');
  }


},

/*
room_delete: async (parent: any, args: any, context: any, info: any) => {



  if (!context.user) {
    throw new Error('you arent login');
  } else {
      console.log(context.user._id);
      try {
        console.log(args);
        const roomServiceInstance = Container.get(RoomService);
        const room = await roomServiceInstance.DeleteRoom(args as IRoom, context.user  as IUser);
        console.log(room);
        return room;
      } catch (e) {
        throw new Error(e);
      }
  }

},

*/

},
};

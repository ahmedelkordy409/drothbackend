import { IRoom } from '../interfaces/IRoom';
import { IUser } from '../interfaces/IUser';

import RoomStudenService from '../services/roomstudent';
import { Container } from 'typedi';



export const roomStudentResolvers = {

  Query: {




  },


Mutation: {


    student_join: async (parent: any, args: any, context: any, info: any) => {
    /*
    * sould auth
    * should be student role
    *
    */
      if (!context.user) {
        throw new Error('you arent login');
      } else {
          console.log(context.user._id);
          try {
            console.log(args);
            const roomServiceInstance = Container.get(RoomStudenService);
            const room = await roomServiceInstance.JoinStudent();
            console.log(room);
            return room;
          } catch (e) {
            throw new Error(e);
          }
      }

    },




    student_approve: async (parent: any, args: any, context: any, info: any) => {
      if (!context.user) {
        throw new Error('you arent login');
      } else {
          console.log(context.user._id);
          try {
            console.log(args);
            const roomServiceInstance = Container.get(RoomStudenService);
            const room = await roomServiceInstance.ApproveStudent();
            console.log(room);
            return room;
          } catch (e) {
            throw new Error(e);
          }
      }

    },







    student_reject: async (parent: any, args: any, context: any, info: any) => {
          // User AUTH check
          if (!context.user) {
            throw new Error('you arent login');
          }

          const roomServiceInstance = Container.get(RoomStudenService);
          const room = await roomServiceInstance.RejectStudent();



    },





},
};

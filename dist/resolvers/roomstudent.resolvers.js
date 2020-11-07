'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomStudentResolvers = void 0;
// import interfaces
//import { IRoom, IUser } from '../interfaces';
//import services
//import { Container } from 'typedi';
//import RoomStudenService from '../services/roomstudent';
// import middlewares
//import { hasAcssese } from '../middlewares';
exports.roomStudentResolvers = {
    Query: {
    /*
        if (!context.user) {
            throw new Error('you arent login');
        } else {
    
            hasAcssese('room:create', context.user.role).then(async()=>{
    
              //console.log({...args, teacher: context.user._id });
              const roomServiceInstance = Container.get(RoomService);
              const room = await roomServiceInstance.CreateRoom({...args, teacher: context.user._id } as IRoom);
              console.log(room);
              return room;
    
            })
            .catch((e)=>{
              throw new Error(e);
            });
    
        }
    */
    },
    Mutation: {},
};
//# sourceMappingURL=roomstudent.resolvers.js.map
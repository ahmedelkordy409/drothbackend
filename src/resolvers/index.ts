import { userResolvers } from './user.resolvers';
import { calendarResolvers } from './calendar.resolvers';
import { roomResolvers } from './room.resolvers';
import { roomStudentResolvers } from './roomstudent.resolvers';



export const resolvers = [userResolvers, calendarResolvers, roomResolvers,roomStudentResolvers];

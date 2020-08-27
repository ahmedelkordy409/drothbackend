import { ICalendar, ICalendarInputDTO } from '../interfaces/ICalendar';
import CalendarService from '../services/calendar';
import { Container } from 'typedi';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const calendarResolvers = {
  Query: {

/*
    getEvent:async (parent: any, args: any, context: any, info: any)=>{
      // AUTH MIDDLEWARE GET
      // GET GOOGLE OAUTH FROM





    },
*/
  },


  Mutation: {
    session_create: async (parent: any, args: any, context: any, info: any) => {
      try {
        console.log(args);
        const calenderServiceInstance = Container.get(CalendarService);
        const session = await calenderServiceInstance.CreateSession(args as ICalendar);
        console.log(session);
        return session;
      } catch (e) {
        throw new Error(e);
      }


    },
/*session_update: async (parent: any, args: any, context: any, info: any) => {
  try {
    console.log(args);
    const calenderServiceInstance = Container.get(CalendarService);
    const session = await calenderServiceInstance.UpdateSession(args as ICalendar);
    console.log(session);
    return session;
  } catch (e) {
    throw new Error(e);
  }
},

  session_delete: async (parent: any, args: any, context: any, info: any) => {
    try {
      console.log(args);
      const calenderServiceInstance = Container.get(CalendarService);
      const session = await calenderServiceInstance.DeleteSession(args as ICalendar);
      console.log(session);
      return session;
    } catch (e) {
      throw new Error(e);
    }

},*/
},
};

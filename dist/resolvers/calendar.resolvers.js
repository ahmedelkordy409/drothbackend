"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarResolvers = void 0;
const calendar_1 = __importDefault(require("../services/calendar"));
const typedi_1 = require("typedi");
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
exports.calendarResolvers = {
    Query: {
    /*
        getEvent:async (parent: any, args: any, context: any, info: any)=>{
          // AUTH MIDDLEWARE GET
          // GET GOOGLE OAUTH FROM
    
    
    
    
    
        },
    */
    },
    Mutation: {
        session_create: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(args);
                const calenderServiceInstance = typedi_1.Container.get(calendar_1.default);
                const session = yield calenderServiceInstance.CreateSession(args);
                console.log(session);
                return session;
            }
            catch (e) {
                throw new Error(e);
            }
        }),
    },
};
//# sourceMappingURL=calendar.resolvers.js.map
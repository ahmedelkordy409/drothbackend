"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_resolvers_1 = require("./user.resolvers");
const calendar_resolvers_1 = require("./calendar.resolvers");
const room_resolvers_1 = require("./room.resolvers");
const roomstudent_resolvers_1 = require("./roomstudent.resolvers");
exports.resolvers = [user_resolvers_1.userResolvers, calendar_resolvers_1.calendarResolvers, room_resolvers_1.roomResolvers, roomstudent_resolvers_1.roomStudentResolvers];
//# sourceMappingURL=index.js.map
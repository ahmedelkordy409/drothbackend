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
exports.roomResolvers = void 0;
const room_1 = __importDefault(require("../services/room"));
const typedi_1 = require("typedi");
exports.roomResolvers = {
    Query: {
        my_rooms: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            /*
            * sould auth
            * should be teacher role
            *
            */
            if (!context.user) {
                throw new Error('you arent login');
            }
            else {
                console.log(context.user._id);
                try {
                    console.log({ teacher: context.user._id });
                    const roomServiceInstance = typedi_1.Container.get(room_1.default);
                    const rooms = yield roomServiceInstance.GetRooms(context.user._id);
                    console.log(rooms);
                    return rooms;
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        }),
    },
    Mutation: {
        room_create: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            /*
            * sould auth
            * should be teacher role
            *
            */
            if (!context.user) {
                throw new Error('you arent login');
            }
            else {
                console.log(context.user._id);
                try {
                    console.log(Object.assign(Object.assign({}, args), { teacher: context.user._id }));
                    const roomServiceInstance = typedi_1.Container.get(room_1.default);
                    const room = yield roomServiceInstance.CreateRoom(Object.assign(Object.assign({}, args), { teacher: context.user._id }));
                    console.log(room);
                    return room;
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        }),
        /**********************************************************
        * for room student management
        ***********************************************************/
        room_update: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            /*
            * sould auth
            * should be teacher role && room owner
            *
            */
            // User AUTH check
            if (!context.user) {
                throw new Error('you arent login');
            }
        }),
    },
};
//# sourceMappingURL=room.resolvers.js.map
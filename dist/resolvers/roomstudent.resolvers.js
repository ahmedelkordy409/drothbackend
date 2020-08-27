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
exports.roomStudentResolvers = void 0;
const roomstudent_1 = __importDefault(require("../services/roomstudent"));
const typedi_1 = require("typedi");
exports.roomStudentResolvers = {
    Query: {},
    Mutation: {
        student_join: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            /*
            * sould auth
            * should be student role
            *
            */
            if (!context.user) {
                throw new Error('you arent login');
            }
            else {
                console.log(context.user._id);
                try {
                    console.log(args);
                    const roomServiceInstance = typedi_1.Container.get(roomstudent_1.default);
                    const room = yield roomServiceInstance.JoinStudent();
                    console.log(room);
                    return room;
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        }),
        student_approve: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('you arent login');
            }
            else {
                console.log(context.user._id);
                try {
                    console.log(args);
                    const roomServiceInstance = typedi_1.Container.get(roomstudent_1.default);
                    const room = yield roomServiceInstance.ApproveStudent();
                    console.log(room);
                    return room;
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        }),
        student_reject: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            // User AUTH check
            if (!context.user) {
                throw new Error('you arent login');
            }
            const roomServiceInstance = typedi_1.Container.get(roomstudent_1.default);
            const room = yield roomServiceInstance.RejectStudent();
        }),
    },
};
//# sourceMappingURL=roomstudent.resolvers.js.map
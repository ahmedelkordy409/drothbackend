'use strict';
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
exports.courseResolvers = void 0;
// get Service injection
const typedi_1 = require("typedi");
const course_1 = __importDefault(require("../services/course"));
// get acssese middlewares
const middlewares_1 = require("../middlewares");
exports.courseResolvers = {
    Query: {},
    Mutation: {
        createCourse: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            /*
             * sould auth
             * should be teacher role
             *
             */
            if (!context.user) {
                throw new Error('you arent login');
            }
            const userRole = context.user.role;
            console.log('*** user role is', userRole);
            const hasPrimission = yield middlewares_1.hasAcssese('course:create', userRole);
            console.log('*** user hasPrimission', hasPrimission);
            if (!hasPrimission) {
                console.log('***! hasPrimissions', hasPrimission);
                throw new Error('you are not athroize to do it');
            }
            try {
                const courseServiceInstance = typedi_1.Container.get(course_1.default);
                const course = yield courseServiceInstance.CreateCourse(args);
                console.log(course);
                return course;
            }
            catch (e) {
                throw new Error(e);
            }
        }),
    },
};
//# sourceMappingURL=course.resolvers.js.map
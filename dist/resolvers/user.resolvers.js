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
exports.userResolvers = void 0;
const auth_1 = __importDefault(require("../services/auth"));
const typedi_1 = require("typedi");
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
exports.userResolvers = {
    Query: {
        me: (parent, args, context, info) => {
            if (!context.user) {
                return Error('you arent login');
            }
            return context.user;
        },
    },
    Mutation: {
        login: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email, password } = args;
                const authServiceInstance = typedi_1.Container.get(auth_1.default);
                const user = yield authServiceInstance.SignIn(email, password);
                console.log(user);
                return user;
            }
            catch (e) {
                return new Error(e);
            }
        }),
        singup: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const authServiceInstance = typedi_1.Container.get(auth_1.default);
                const user = yield authServiceInstance.SignUp(args);
                console.log('authServiceInstance is sucsses', user);
                return user;
            }
            catch (e) {
                return new Error(e);
            }
        }),
    },
};
//# sourceMappingURL=user.resolvers.js.map
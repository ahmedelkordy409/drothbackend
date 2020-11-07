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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAcssese = void 0;
function hasAcssese(permission, userRole) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (userRole) {
            case "instructor": {
                //statements;
                const hasPrimission = instructorPremisions.includes(permission);
                if (!hasPrimission) {
                    return false;
                }
                return true;
            }
            case "student": {
                //statements;
                const hasPrimission = studentPremisions.includes(permission);
                if (!hasPrimission) {
                    return false;
                }
                return true;
            }
            default: {
                //statements;
                return false;
            }
        }
    });
}
exports.hasAcssese = hasAcssese;
const instructorPremisions = [
    // for rooms
    'course:create',
    'course:update',
    'course:delete',
    'course:get',
    // for rooms studendts
    'student:aprrove',
    'student:decline',
    'student:get',
    // for scale
    'scale:*',
    'scale:update',
    'scale:update',
    'scale:update',
];
const studentPremisions = [
    // for rooms
    'room:get',
    'room:joint',
];
//# sourceMappingURL=authrization.middleware.js.map
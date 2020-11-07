"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typedi_1 = require("typedi");
const room_model_1 = __importDefault(require("../models/room.model"));
const roomuser_model_1 = __importDefault(require("../models/roomuser.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// const rooms: IRoomStudent[] = [];
let RoomService = class RoomService {
    constructor() { }
    /*****************************************************
     * to create new event as session sheudling
     * Insert into session calendar
     *
     * @ primision
     * @ param
     *
     ******************************************************/
    JoinStudent(studentId, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRoom = yield room_model_1.default.findOne({ _id: roomId });
            if (!findRoom) {
                throw new Error('THERE_IS_NO_ROOM');
            }
            console.log('2-: we foun room');
            // 1- check if he already in the room
            const findStudent = yield user_model_1.default.findOne({ _id: studentId });
            // 2 - if user already in this room && return "you are allready in this room"
            const isRoomStudent = findStudent.rooms.includes(roomId);
            console.log('3-: isRoomStudent', isRoomStudent);
            if (isRoomStudent) {
                throw new Error("YOU_ARE_ALREADY");
            }
            console.log("3-: we foun Student");
            // 3- else record new student to the room
            const newStudent = yield roomuser_model_1.default.create({
                student: studentId,
                room: roomId,
                isApproved: false,
            });
            findRoom.students.push(newStudent._id);
            const addStudent = yield findRoom.save();
            findStudent.rooms.push(roomId);
            const addRoom = yield findStudent.save();
            // 4- return data
            return newStudent;
        });
    }
    /*****************************************************
     * to create new event as session sheudling
     * Insert into session calendar
     *
     * @ primision
     * @ param
     *
     ******************************************************/
    ApproveStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
    /*****************************************************
     * to create new event as session sheudling
     * Insert into session calendar
     *
     * @ primision
     * @ param
     *
     ******************************************************/
    RejectStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            //1- check if user has calendar called """ sessions """"
        });
    }
    /*****************************************************
     * to create new event as session sheudling
     * Insert into session calendar
     *
     * @ primision
     * @ param
     *
     ******************************************************/
    GenerateAuthKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
};
RoomService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], RoomService);
exports.default = RoomService;
//# sourceMappingURL=roomUser.js.map
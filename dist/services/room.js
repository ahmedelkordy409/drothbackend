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
const user_model_1 = __importDefault(require("../models/user.model"));
const rooms = [];
const data = {
    _id: 'id for room ',
    teacher: 'id for teacher room ',
    tittle: 'String',
    cover: 'String',
    description: 'String',
    students: [
        {
            _id: 'user._id',
            name: 'ahmed elkordy',
            avatar: 'wwww.google.com/user.png',
            isApproved: false,
        },
    ],
};
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
    CreateRoom(roomInputDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            // get user id from token (from user who store in AWS rediasDB)
            const newRoom = yield room_model_1.default.create(roomInputDTO);
            console.log('room create +++', newRoom);
            const teacherId = newRoom.teacher.toString();
            console.log('room create +++', teacherId);
            const find = yield user_model_1.default.findOne({ _id: teacherId });
            find.rooms.push(newRoom._id);
            const updated = yield find.save();
            console.log('room +++++ ++++ +++', updated);
            return newRoom;
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
    GetRooms(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            // get user id from token (from user who store in AWS rediasDB)
            const userRooms = yield user_model_1.default.findOne({ _id: teacherId }).populate('rooms');
            console.log("الحمد لله ", userRooms);
            return userRooms;
        });
    }
};
RoomService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], RoomService);
exports.default = RoomService;
//# sourceMappingURL=room.js.map
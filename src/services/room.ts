//import fs from "fs";
//import readline from "readline";
//import {google} from "googleapis";
import { IRoom } from '../interfaces/IRoom';
import { IUser } from '../interfaces/IUser';

import { Service } from 'typedi';

import RoomModel from '../models/room.model';
import UserModel from '../models/user.model';

const rooms: IRoom[] = [];

const data: IRoom = {
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

@Service()
export default class RoomService {
  constructor() {}



  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async CreateRoom(roomInputDTO: IRoom): Promise<IRoom> {
    // get user id from token (from user who store in AWS rediasDB)
    const newRoom = await RoomModel.create(roomInputDTO);
    console.log('room create +++', newRoom);
    const teacherId: string = newRoom.teacher.toString();
    console.log('room create +++', teacherId);


    const find = await UserModel.findOne({ _id: teacherId });
    find.rooms.push( newRoom._id);
    const updated = await  find.save();
    console.log('room +++++ ++++ +++', updated);

    return newRoom;
  }




  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async GetRooms(teacherId: string) {
    // get user id from token (from user who store in AWS rediasDB)

   const userRooms = await UserModel.findOne({  _id: teacherId  }).populate('rooms');
    console.log("الحمد لله " , userRooms);
    return userRooms;
  }






}

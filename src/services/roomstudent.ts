import { IRoom } from '../interfaces/IRoom';
import { IRoomStudent } from '../interfaces/IRoomStudent';


import { Service } from 'typedi';
import RoomModel from '../models/room.model';
import RoomStudent from '../models/roomuser.model';



// const rooms: IRoomStudent[] = [];


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
    public async JoinStudent() {

   // 1- check if he already in the room

   // 2 - if user already in this room && return "you are allready in this room"

   // 3- else record new student to the room

   // 4- return data
      return ;
    }






  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
    public async ApproveStudent() {


    //


    }




  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
   public async RejectStudent() {

   //1- check if user has calendar called """ sessions """"




   }



   /*****************************************************
    * to create new event as session sheudling
    * Insert into session calendar
    *
    * @ primision
    * @ param
    *
    ******************************************************/
    private async GenerateAuthKey() {

      return ;
    }






}

//import { IRoom , IRoomUser } from '../interfaces';
import WorkspaceModel from '../models/workspace.model';
import WorkspaceUserModel from '../models/workspaceuser.model';
import UserModel from '../models/user.model';

// const rooms: IRoomStudent[] = [];

export default class WorkspaceUser {
  constructor() {}

  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async Join(userId: string, roomId: string) {
    // for speclist role only
    return await WorkspaceModel.findOne({ _id: roomId })
    .then(async workspace => {

      if (!workspace) {
        throw new Error('THERE_IS_NO_WORKSPACE');
      }


          // 1- check if he already in the room
          const findUser = await UserModel.findOne({ _id: userId });
          // 2 - if user already in this room && return "you are allready in this room"
          if (findUser === undefined) {
            throw new Error('ROOM_USER_ERROR');
          } else {
            const isWorkspaceSpcialist = findUser?.workspaces?.includes(roomId);
            console.log('3-: isRoomStudent', isWorkspaceSpcialist);
            if (isWorkspaceSpcialist) {
              throw new Error('YOU_ARE_ALREADY');
            }
            console.log('3-: we foun Student');
          }


          const workspaceUser = {
            role: 'String',
            room: roomId,
            isApproved: false,
          };

          // 3- else record new student to the room
          const newUser = await WorkspaceUserModel.create(workspaceUser);

          workspace.users.push(newUser._id);
          const addStudent = await workspace.save();

          if (findUser === undefined) {
            throw new Error('ROOM_USER_ERROR');
          }else{
            findUser?.workspaces?.push(roomId.toString());
            const saveWorkspace = await findUser?.save();
          }
          // 4- return data
          return newUser;

    })
    .catch( error => {
      throw new Error(error);
    })

  }

  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async AddUserByAdmin(userId: string) {
    // add
    // for center_manager and family role only
  }

  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async ApproveUser(roomUserId: string) {
    await WorkspaceUserModel.updateOne({ _id: roomUserId }, { isApproved: true });
  }

  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async RejectUser(roomUserId: string) {
    // family   && center_manager
    //1- check if user has calendar called """ sessions """"
    await WorkspaceUserModel.updateOne(
      { _id: roomUserId },
      { isApproved: false, isDeleted: true }
    );
  }

  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async SetUserPrimission(
    workspaceUserId: string,
    workspaceUserPrimission: string[]
  ) {
    // family   && center_manager
    //1- check if user has calendar called """ sessions """"
    await WorkspaceUserModel.updateOne(
      { _id: workspaceUserId },
      { primission: workspaceUserPrimission }
    );
  }


  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async AllUser(workspaceId: String) {
    // family   && center_manager
    //1- check if user has calendar called """ sessions """"
    await WorkspaceModel.find(workspaceId);
  }











}

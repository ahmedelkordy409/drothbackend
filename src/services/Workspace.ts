'use strict';
import { IWorkspace } from '../interfaces';
import WorkspaceModel from '../models/workspace.model';
import UserModel from '../models/user.model';
import OrgnizationModel from '../models/orgnization.model';

export default class WorkSpace {
  constructor() {}

  /*****************************************************
   *  to create new room  fro child
   *  Insert into session calendar
   *
   *  @ params
   *
   ******************************************************/
  public async createWorkSpace(userId: string) {
    return await WorkspaceModel.create()
      .then(
        async (newWorkspace): Promise<IWorkspace> => {
          console.log('room create +++', newWorkspace);

          const findUser = await UserModel.findOne({ _id: userId });
          findUser?.workspaces?.push(newWorkspace._id);
          const addWorkspace = await findUser?.save();
          console.log('room +++++ ++++ +++', addWorkspace);

          newWorkspace?.users?.push(newWorkspace._id);
          const updateWorkspace = await newWorkspace?.save();
          console.log('room +++++ ++++ +++', updateWorkspace);
          return newWorkspace;
        }
      )
      .catch((error) => {
        throw new Error(error);
      });
  }

  /*****************************************************
   *  to create new room  fro child
   *  Insert into session calendar
   *
   *  @ params
   *
   ******************************************************/
  public async addOrgnizationToWorkSpace(orgnizationId: string, workSpaceId: string ) {
    return await WorkspaceModel.findOne({_id: workSpaceId})
      .then(
        async (workspace): Promise<IWorkspace> => {

          if (workspace === null || undefined){
            throw new Error("workspace");
          }else{
            const findOrgnization = await OrgnizationModel.findOne({ _id: orgnizationId });
            findOrgnization?.workspaces?.push(workspace._id);
            if (findOrgnization === null || undefined){
              throw new Error("workspace");
            }else{
              await findOrgnization.save();
            }

            workspace.orgnizations.push(workspace._id);
            const updateWorkspace = await workspace.save();
            console.log('room +++++ ++++ +++', updateWorkspace);
            return workspace;
          }

        }
      )
      .catch((error) => {
        throw new Error(error);
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
  public async ListWorkSpacesByOrgnization(userId: string) {
    // get user id from token (from user who store in AWS rediasDB)
    const workspaces = await OrgnizationModel.findOne({ _id: userId }).populate(
      'workspaces'
    );
    console.log('workspaces ....................... ', workspaces);
    return workspaces;
  }


  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async ListOrgnizationbyWorkSpace(userId: string) {
    // get user id from token (from user who store in AWS rediasDB)
    const workspaces = await OrgnizationModel.findOne({ _id: userId }).populate(
      'workspaces'
    );
    console.log('workspaces ....................... ', workspaces);
    return workspaces;
  }
















  /*****************************************************
   * to create new event as session sheudling
   * Insert into session calendar
   *
   * @ primision
   * @ param
   *
   ******************************************************/
  public async deleteWorkSpace(userId: string, workspaceId: string) {
    // get user id from token (from user who store in AWS rediasDB)
    /*const userRooms = await UserModel.findOne({ _id: tag }).populate('Workspace');
    return userRooms;*/
  }
}

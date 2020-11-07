'use strict';
//import { IOrgnization } from '../interfaces';
import OrgnizationModel from '../models/orgnization.model';
//import UserModel from '../models/user.model';




export default class Orgnization {
  constructor() {}

    /*****************************************************
     *  to create new room  fro child
     *  Insert into session calendar
     *
     *  @ params
     *
     ******************************************************/
    public async createOrgnizationByOrgnizationManager(userId: string) {
      return await OrgnizationModel.create()
        .then(
          /*async (newOrgnization) : Promise<IOrgnization> => {
            console.log('room create +++', newOrgnization);

            const findUser = await UserModel.findOne({ _id: userId });
            findUser?.orgnizations?.push(newOrgnization._id);
            const addWorkspace = await findUser?.save();

            newOrgnization?.users?.push(newWorkspace._id);
            const updateWorkspace = await newWorkspace?.save();
            console.log('room +++++ ++++ +++', updateWorkspace);
            return newOrgnization;
          }*/
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
       *  /// AddSpecilastTo
       ******************************************************/
        public async addSpecialistByOrgnizationManager(userId: string) {
          return await OrgnizationModel.create()
            .then(


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
       *  /// AddSpecilastTo
       ******************************************************/
        public async removeSpecialistByOrgnizationManager(userId: string) {
          return await OrgnizationModel.create()
            .then(

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
       *  /// AddSpecilastTo
       ******************************************************/
      public async addWorkspaceToOrgnization(userId: string) {
        return await OrgnizationModel.create()
          .then(

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
       *  /// AddSpecilastTo
       ******************************************************/
      public async removeWorkspaceToOrgnization(userId: string) {
        return await OrgnizationModel.create()
          .then(

          )
          .catch((error) => {
            throw new Error(error);
          });
      }







}

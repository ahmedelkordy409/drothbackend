'use strict';
// import interfaces
//import { IRoom, IUser } from '../interfaces';
// import middlewares
import { hasAcsses } from '../core/middlewares';
// import services
import WorkspaceUser from '../services/WorkspaceUser';


const workspaceUser = new WorkspaceUser();

export const workspaceUserResolvers = {
  Query: {

    /*
     * @ desc    to Reject user from acssese to this Workspace
     * @ privet  route
     * @ acsses  manager
     * @ pramas  workspaceId
     */
    AllWorkspaceOrgnizationSpeclists:  async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['speclist', 'center'])
        .then(async () => await workspaceUser.AllUser(args.workspaceId))

        .catch((error: string) => {
          throw new Error(error);
        });
    },
    /*
     * @ desc    to Reject user from acssese to this Workspace
     * @ privet  route
     * @ acsses  family@owner
     * @ pramas  workspaceId
     */
    AllWorkspaceSpeclists:  async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['speclist', 'center'])
        .then(async () => await workspaceUser.AllUser(args.workspaceId))

        .catch((error: string) => {
          throw new Error(error);
        });
    },



  },

  Mutation: {


    /*
     * @ desc  to Reject user from acssese to this Workspace
     * @ privet route
     * @ acsses  manager only
     */
    AddWorkspaceUserByManager: async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['speclist', 'center'])
        .then(async () => await workspaceUser.AddUserByAdmin(args.user._id))

        .catch((error: string) => {
          throw new Error(error);
        });
    },

    /*
     * @ desc  to Reject user from acssese to this Workspace
     * @ privet route
     * @ acsses  manager || family@owner
     */
    ApproveWorkspaceUser: async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['speclist', 'center'])
        .then(async () => await workspaceUser.ApproveUser(args.user._id))

        .catch((error: string) => {
          throw new Error(error);
        });
    },

    /*
     * @ desc  to Reject user from acssese to this Workspace
     * @ privet route
     * @ acsses  manager || family@owner
     */
    RejectWorkspaceUser: async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['speclist', 'center'])
        .then(async () => await workspaceUser.RejectUser(context.user._id))

        .catch((error: string) => {
          throw new Error(error);
        });
    },

    /*
     * @ desc  to set dynmic primission to Workspace user
     * @ privet route
     * @ acsses  manager || family@owner
     */
    SetWorkspaceUserPrimission: async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['family', 'center'])
        .then(
          async () =>
            await workspaceUser.SetUserPrimission(args.userId, args.primission)
        )

        .catch((error: string) => {
          throw new Error(error);
        });
    },


  },
};

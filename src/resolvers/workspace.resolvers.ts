'use strict';
import WorkSpace from '../services/Workspace';
import { hasAcsses } from '../core/middlewares';
//import { IWorkspaceInputDTO } from '../interfaces';

const workspaceService = new WorkSpace();

export const workspaceResolvers = {
  Query: {
    /*
     * uonion type to get rooms
     */
    /*
     * @ desc  fetch  all Orgnization work WorkSpaces by Orgnization_manager
     * @ privet route
     * @ acsses Orgnization  manager only
     * @ params  orgnizationId && userId
     */
    AllOrgnizationWorkspaces: async (_: any, context: any) => {
      return await workspaceService.ListWorkSpacesByOrgnizationUser(
        context.user._id
      );
    },
    /*
     * @ desc  fetch  all Orgnization work WorkSpaces by Orgnization_Specialist
     * @ privet route
     * @ acsses Orgnization  manager only
     * @ params  orgnizationId && userId
     */
    WorkspacesByOrgnizationSpecialist: async (_: any, context: any) => {
      return await workspaceService.ListWorkSpacesByOrgnizationUser(
        context.user._id
      );
    },
  },

  Mutation: {
    /*
     * by family account only
     */
    createWorkspace: async (_: any, context: any) => {
      hasAcsses(context, true, ['family'])
        .then(
          async () => await workspaceService.createWorkSpace(context.user._id)
        )

        .catch((error: string) => {
          throw new Error(error);
        });
    },

    /*
     * @ desc  add this workspace to Orgnization
     * @ privet route
     * @ acsses  manager || family@owner
     * @ params  orgnizationId && userId
     */
    JoinWorkspaceByOrgnization: async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['speclist', 'manager'])
        .then(async () => await workspaceService.Join(context.user._id, args))

        .catch((error: string) => {
          throw new Error(error);
        });
    },

    /*
     * @ desc  delete workspace by his owner family account
     * @ privet route
     * @ acsses  family@owner only
     * @ params  WorkspaceId && userId
     */
    deleteWorkspace: async (_: any, args: any, context: any) => {
      hasAcsses(context, true, ['family'])
        .then(
          async () =>
            await workspaceService.deleteWorkSpace(context.user._id, args)
        )

        .catch((error: string) => {
          throw new Error(error);
        });
    },
  },
};

'use strict';
import Orgnization from '../services/Orgnization';
import { hasAcsses } from '../core/middlewares';
//import { IWorkspaceInputDTO } from '../interfaces';

const orgnizationService = new Orgnization();

export const  orgnizationResolvers = {
  Query: {
    /*
     * @ desc  fetch  all Orgnization work WorkSpaces by Orgnization_manager
     * @ privet route
     * @ acsses Orgnization  manager only
     * @ params  orgnizationId-> args   &&    userId-> context
     */
    AllOrgnizationWorkspaces: async (_: any, context: any) => {
      return await orgnizationService.ListWorkSpacesByOrgnizationUser(
        context.user._id
      );
    },


  },

  Mutation: {
    /*
     * by family account only
     */

  },
};

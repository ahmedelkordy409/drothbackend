import { userResolvers } from './user.resolvers';
import { workspaceResolvers } from './workspace.resolvers';
import { workspaceUserResolvers } from './workspaceuser.resolvers';
import { orgnizationResolvers } from './orgnization.resolvers';
import { calendarResolvers } from './calendar.resolvers';


export const resolvers = [
  userResolvers,
  workspaceResolvers,
  workspaceUserResolvers,
  orgnizationResolvers,
  calendarResolvers,
];

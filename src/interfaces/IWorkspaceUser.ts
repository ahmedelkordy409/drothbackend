

export interface IWorkspaceUser {
  _id?: String;

  role?: String;

  primission?: String[];



  workspace?: String;

  isApproved: boolean;
  isDeleted?: boolean;
  jointAt?: String;
  leaveAt?: String;

  //addedBy
}

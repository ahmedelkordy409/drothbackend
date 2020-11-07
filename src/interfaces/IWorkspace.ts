import { IWorkspaceUser } from '../interfaces';

export interface IWorkspace {
  _id: String;
  qr_code: String;

  // profile
  // scalse
  // Workspace controll
  isDeleted: boolean;


  // realationship
  users: IWorkspaceUser[];
  orgnizations: String[];
}

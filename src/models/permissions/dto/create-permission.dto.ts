/*export class CreatePermissionDto {
  readonly name: string;
  readonly Config: JSON;
  readonly jss: JSON;
}*/
export class CreatePermissionDto
{
    readonly Name: string;
    readonly addUsers: boolean;
    readonly deleteUsers: boolean;
    readonly editUsers: boolean;
    readonly manageTasks: boolean;
    readonly departmentTasks: boolean;
    readonly editUsersPassword: boolean;
    readonly manageScoupes: boolean;
    readonly managePositions: boolean;
    readonly managePositionNames: boolean;
    readonly manageDepartment: boolean;
    readonly manageGeneralPositions: boolean;
    readonly managment: boolean;
}

export class CreatePermissionDto
{
    readonly name: string;
    readonly Config: JSON;
    readonly jss:JSON
}
/*export class CreatePermissionDto
{
    readonly name: string;
    readonly Config: {
        addUsers: boolean,
        deleteUsers: boolean,
        createTasks: boolean,
        editUsersPassword: boolean,
        addScoupes: boolean,
        addPositions: boolean,
        addDepartment: boolean,
        checkGeneralStats: boolean
    };
}*/
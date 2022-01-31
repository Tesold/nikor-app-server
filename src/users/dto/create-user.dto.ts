export class CreateUserDto{
    readonly Email:string;
    readonly FirstName: string;
    readonly LastName: string;
    readonly MiddleName: string;
    readonly Nickname: string;
    readonly Birthday: Date;
    readonly PasswordHash: string;
    readonly Timezone: number;
}
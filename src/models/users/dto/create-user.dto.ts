import { IsString, IsEmail, IsInt, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный e-mail.' })
  @Length(6, 64)
  readonly Email: string;

  @Length(2, 24)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly FirstName: string;

  @Length(2, 24)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly LastName: string;

  @Length(2, 24)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly MiddleName: string;

  @Length(2, 16)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly Nickname: string;

  @Length(10, 10)
  readonly Birthday: Date;

  @IsString({ message: 'Не верный формат пароля.' })
  @Length(32, 1024)
  readonly PasswordHash: string;

  @IsInt({ message: 'Поле должно быть числом.' })
  readonly Timezone: number;
  @IsString({ message: 'Не верный permission.' })
  @Length(2, 16)
  readonly Permission: string;

  @Length(2, 1024)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly Salt: string;
}

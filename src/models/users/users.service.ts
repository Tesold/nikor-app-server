import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionsService } from 'src/models/permissions/permissions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { Password } from './pass.model';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Permission } from 'src/models/permissions/permissions.model';
import { BadPassword } from 'src/errors/errors';
import { Op } from 'sequelize';
import { GeneralPosition } from '../positions/generalpositions.model';
import { Position } from '../positions/positions.model';
import { PositionName } from '../positions/positionsName.model';
import { Department } from '../positions/department.model';
import { Scoupe } from '../positions/scoupes.model';
import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private permissionService: PermissionsService,
    @InjectModel(Password) private passwordRepository: typeof Password,
  ) {}

  /*async createAdmin(dto: CreateUserDto)
    {
        if (dto.PasswordHash) {
            const permission = await this.permissionService.getPermissionByName(dto.Permission);
            if(permission)
            {
                const user = await this.userRepository.create(dto);
                const password = await this.createUserPassword(dto.PasswordHash, dto.Salt);
                await user.$set('PermissionID', [permission.ID]);
                await user.$set('Password', password);
                return user;
            }
            return new BadRequestException();
        }

        return BadPassword();   
    }*/

  async createUser(dto: CreateUserDto) {

    try{
      
      console.log(dto);
    
      const user = await this.userRepository.create(dto);
        
        const password = await this.createUserPassword(
          dto.PasswordHash,
          dto.Salt,
        );

        console.log(password);

        await user.$set('Password', password);
        return user;
      }
          catch{
      return new BadRequestException();
    }
  }

  async getUserByName(Nickname: string, passNeed: boolean) {
    switch (passNeed) {
      case false:
        return await this.userRepository.findOne({
          where: { Nickname },
          include: [Scoupe, Permission, GeneralPosition, {model: Position, include: [{model: PositionName, include: [{model: Department, include: [Scoupe]}]}]}],
        });
      case true: {
        const user = await this.userRepository.findOne({
          where: { Nickname },
          include: [Scoupe, Permission, GeneralPosition, Password, {model: Position, include: [{model: PositionName, include: [{model: Department, include: [Scoupe]}]}]}],
        });
        return user;
      }
    }
  }
  
  async getUserByID(ID: number, passNeed: boolean) {
    switch (passNeed) {
      case false:
        return await this.userRepository.findOne({
          where: { ID },
          include: [Scoupe, Permission, GeneralPosition, {model: Position, include: [{model: PositionName, include: [{model: Department, include: [Scoupe]}]}]}],
        });
      case true: {
        const user = await this.userRepository.findOne({
          where: { ID },
          include: [Scoupe, Permission, GeneralPosition, Password, {model: Position, include: [{model: PositionName, include: [{model: Department, include: [Scoupe]}]}]}],
        });
        return user;
      }
    }
  }

  async getAllusers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getAllusersExcept(Nickname: string, ScoupeID?:number) {

    if(ScoupeID>0)
    return await this.userRepository.findAll({
      where: {
        Nickname: {
          [Op.ne]: Nickname,
        },
        ScoupeID: ScoupeID,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'PassID', 'Timezone', 'Nickname'],
      },
      include: [Position, Scoupe]
    });

    return await this.userRepository.findAll({
      where: {
        Nickname: {
          [Op.ne]: Nickname,
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'PassID', 'Timezone', 'Nickname'],
      },
      include: [Position, Scoupe]
    });
  }

  async createUserPassword(pass: string, salt: string) {
    //try{
    console.log('bcrypt');
    const hash = bcrypt.hashSync(pass, salt);
    const passDto: CreatePasswordDto = { PassHash: hash, Salt: salt };
    const password = await this.passwordRepository.create(passDto);

    return password;
    //}
    /*catch{
            this.userRepository.destroy({where: {Nickname: Nickname}});
            throw "Не удалось создать пароль!"
        }*/
  }

  async checkPasswordHash(password: string, salt: string, hash: string) {
    if ((await bcrypt.hash(hash, salt)) === password) return true;

    return false;
  }

  async checkPasswordByName(Nickname: string, hash: string) {
    const user = await this.getUserByName(Nickname, true);
    if (
      user &&
      (await bcrypt.hash(hash, user.Password.Salt)) === user.Password.PassHash
    ){
      return user;
    }
    return null;
  }

  async setScoupeForUser(ScoupeID: number, ID:number)
  {
    try{
      await this.userRepository.update({ScoupeID}, {where: {ID}});
    }
    catch{
      return new HttpException("Не удалось назначит структуру пользователю!", 500);
    }
  }
}

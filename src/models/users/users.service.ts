import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { Password } from './pass.model';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Permission } from 'src/models/permissions/permissions.model';
import { Op } from 'sequelize';
import { GeneralPosition } from '../positions/generalpositions.model';
import { Position } from '../positions/positions.model';
import { PositionName } from '../positions/positionsName.model';
import { Department } from '../positions/department.model';
import { Scoupe } from '../positions/scoupes.model';
import { ScoupeGeneralPosition } from '../positions/scoupegeneralpositions.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Password) private passwordRepository: typeof Password,
  ) {}

  async createUser(dto: CreateUserDto) {

    try{
      
      const user = await this.userRepository.create(dto);

      console.log(user);
        
        const password = await this.createUserPassword(
          dto.PasswordHash,
          dto.Salt,
        );

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

  async getAllusersExcept(Nickname: string, ScoupeID?:number, Permission?:string, DepartmentID?:number) {

    if(DepartmentID)
    return await this.userRepository.findAll({
      where: {
        Nickname: {
          [Op.ne]: Nickname,
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'PassID', 'Timezone', 'Nickname'],
      },
      include: [{model: Position, required: true, include:[{model: PositionName, required:true, where: {DepartmentID}}]}, Scoupe]});

    if(ScoupeID)
      return await this.userRepository.findAll({
        where: {
          Nickname: {
            [Op.ne]: Nickname,
          },
          ScoupeID: ScoupeID
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'PassID', 'Timezone', 'Nickname'],
        },
        include: [{model:Position, include:[{model: PositionName, include:[{model: Department}]}]}, Scoupe]
      });
    
    if(Permission==='ADMIN')
    return await this.userRepository.findAll({
      where: {
        Nickname: {
          [Op.ne]: Nickname,
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'PassID', 'Timezone', 'Nickname'],
      },
      include: [GeneralPosition, ScoupeGeneralPosition, {model:Position, include:[{model: PositionName, include:[{model: Department}]}]}, Scoupe]
    });
  }

  async createUserPassword(pass: string, salt: string) {
    //try{
    const hash = bcrypt.hashSync(pass, salt);
    const passDto: CreatePasswordDto = { PassHash: hash, Salt: salt };
    const password = await this.passwordRepository.create(passDto);

    return password;
    //}
    /*catch{
            this.userRepository.destroy({where: {Nickname: Nickname}});
            throw "???? ?????????????? ?????????????? ????????????!"
        }*/
  }

  async checkPasswordHash(password: string, salt: string, hash: string) {
    if ((await bcrypt.hash(hash, salt)) === password) return true;

    return false;
  }

  async setUserScoupeNull(ID) {
    this.userRepository.update({ScoupeID: null}, {where:{ID}})

    return true;
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
      return new HttpException("???? ?????????????? ???????????????? ?????????????????? ????????????????????????!", 500);
    }
  }
}

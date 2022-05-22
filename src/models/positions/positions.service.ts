import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/users/users.model';
import { UsersService } from '../users/users.service';
import { Department } from './department.model';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import { CreateGeneralPositionDto } from './dto/CreateGeneralPosition.dto';
import { CreatePositionDto } from './dto/CreatePosition.dto';
import { CreatePositionNameDto } from './dto/CreatePositionName.dto';
import { CreateScoupeDto } from './dto/CreateScoupe.dto';
import { CreateScoupeGeneralPositionDto } from './dto/CreateScoupeGeneralPosition.dto';
import { GeneralPosition } from './generalpositions.model';
import { Position } from './positions.model';
import { PositionName } from './positionsName.model';
import { ScoupeGeneralPosition } from './scoupegeneralpositions.model';
import { Scoupe } from './scoupes.model';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Scoupe) private scoupeRepository: typeof Scoupe,
    @InjectModel(PositionName)
    private positionNameRepository: typeof PositionName,
    @InjectModel(Position) private positionRepository: typeof Position,
    @InjectModel(Department) private departmentRepository: typeof Department,
    @InjectModel(GeneralPosition) private generalPositionRepository: typeof GeneralPosition,
    @InjectModel(ScoupeGeneralPosition) private scoupeGeneralPositionRepository: typeof ScoupeGeneralPosition,
    private usersService: UsersService,
  ) {}

  async addScoupe(dto: CreateScoupeDto) {
    await this.scoupeRepository.create(dto);
  }

  async addDepartment(dto: CreateDepartmentDto) {
    try {
      await this.departmentRepository.create(dto);
    } catch {
      console.log('Не удалось добавить департамент');
      throw new HttpException('Не удалось создать отдел!', 401);
    }
  }

  async addPositionName(dto: CreatePositionNameDto) {
    await this.positionNameRepository.create(dto);
  }

  async addPosition(dto: CreatePositionDto, ScoupeID: number, Permission: string) {

    const pos = await this.positionNameRepository.findOne({
      where: {ID: dto.PositionNameID},
       include: [
         {model: Department, 
          required: true, 
          include:[
            {model: Scoupe, 
              required: true, 
              where: {ID: ScoupeID}}]}]});

    if(pos||Permission==='ADMIN')
    return await this.positionRepository.create(dto);
  }

  async addGeneralPosition(dto: CreateGeneralPositionDto) {
    return await this.generalPositionRepository.create(dto);
  }

  async addScoupeGeneralPosition(dto: CreateScoupeGeneralPositionDto) {
    return await this.scoupeGeneralPositionRepository.create(dto);
  }

  async getScoupes() {
    try {
      return await this.scoupeRepository.findAll({ include: [{model: Department, include:[{model: PositionName, include: [Position, 'ObeyTo']}]}] });
    } catch {
      console.log('Не удалось получить структуры');
      throw new HttpException('Не удалось получить структуры', 401);
    }
  }

  async getScoupe(ScoupeID: number){
    try {
      return await this.scoupeRepository.findOne({where:{ID:ScoupeID}, include: [{model: Department, include:[{model: PositionName, include: [Position]}]}] });
    } catch {
      throw new HttpException('Не удалось получить структуру', 401);
    }
  }

  async getDepartments() {
    try {
      return await this.departmentRepository.findAll({
        include: [PositionName],
      });
    } catch {
      console.log('Не удалось добавить департамент');
      throw new HttpException('Не удалось запросить отделы!', 401);
    }
  }

  async deleteDepartment(ID: number) {
    try {
      return await this.departmentRepository.destroy({ where: { ID: ID } });
    } catch {
      console.log('Не удалось удалить департамент');
      throw new HttpException('Не удалось удалить отдел!', 401);
    }
  }

  async deletePositionName(ID: number) {
    try {
      return await this.positionNameRepository.destroy({ where: { ID: ID } });
    } catch {
      console.log('Не удалось удалить наименование должности');
      throw new HttpException(
        'Не удалось удалить наименование должности!',
        401,
      );
    }
  }

  async deleteScoupe(ID: number) {
    try {
      return await this.scoupeRepository.destroy({ where: { ID: ID } });
    } catch {
      console.log('Не удалось удалить структуру');
      throw new HttpException('Не удалось удалить структуру!', 401);
    }
  }

  async getPositionNames(ID: number) {
    try {
      return await this.positionNameRepository.findAll({
        where: { DepartmentID: ID },
      });
    } catch {
      console.log('Не удалось получить наименование должности.');
      throw new HttpException(
        'Не удалось получить наименование должности.',
        401,
      );
    }
  }

  async getAllPositionNames() {
    try {
      return await this.positionNameRepository.findAll();
    } catch {
      console.log('Не удалось получить наименование должности.');
      throw new HttpException(
        'Не удалось получить наименование должности.',
        401,
      );
    }
  }

  async deletePosition(ID: number) {
    await this.positionRepository.destroy({ where: { ID } });
  }

  async getPositionByPositionNameID(ID: number) {
    try {
      return await this.positionRepository.findAll({
        where: { PositionNameID: ID },
      });
    } catch {
      console.log('Не удалось получить должность.');
      throw new HttpException('Не удалось получить должность.', 401);
    }
  }

  async getPositionByID(ID: number) {
    try {
      return await this.positionRepository.findOne({
        where: { ID: ID },
        include: [{ model: PositionName, include: [{model: Department, include: [Scoupe]}] }],
      });
    } catch {
      throw new HttpException('Не удалось получить должность.', 401);
    }
  }

  async getAllPositions() {
    try {
      return await this.positionRepository.findAll();
    } catch {
      console.log('Не удалось получить должность.');
      throw new HttpException('Не удалось получить должность.', 401);
    }
  }

  async getScoupesWithAllData() {
    return await this.scoupeRepository.findAll({
      include: [{ model: Department, include: [{model: PositionName, include:['ObeyTo']}] }],
    });
  }

  async setUserForPosition( UserID: any, PositionID: number, ScoupeID?: number, Permission?: any) {

    const user = await this.usersService.getUserByID(UserID, false);

    if(((await this.getPositionByID(PositionID)).PositionName.Department.Scoupe.ID === ScoupeID 
    && user.Position.PositionName.Department.Scoupe.ID === ScoupeID )
    || Permission==='ADMIN')
    {
      await this.positionRepository.update({UserID:null}, {where: {ID:user.Position.ID}});
      await this.positionRepository.update({UserID}, {where: {ID:PositionID}});
      return HttpCode(201);
    }

    throw new HttpException('Не удалось задать должность.', 401);
  }

  async setUserForGeneralPosition(ID: any, UserID: any) {
    await this.generalPositionRepository.update({UserID}, {where:ID});
  }

  async getFreePositions(ScoupeID:any, DepartmentID: number, Permission:any){

    if(DepartmentID){
    const res = await this.positionRepository.findAll(
      {
        include: [{model: PositionName, required: true, include: [{model: Department, required: true, where:{ID: DepartmentID}}]}]
      })

      return res;
    }

    if(ScoupeID)
    return await this.positionRepository.findAll(
      {
        include: [{model: PositionName, required: true, include: [{model: Department, required: true, where:{ScoupeID}}]}]
      })
      
      if(Permission=='Admin')
      return await this.positionRepository.findAll(
        {
          include: [{model: PositionName, include: [{model: Department}]}]
        })
  }

  async setManagerForPositionName(ID: number, ObeyToID: number){

    try{
    if(ID!==ObeyToID)
    this.positionNameRepository.update({ObeyToID},{where:{ID}})
    return 201;
    }
    catch{
      throw new HttpException('Не вышло назначить командование!', 403);
    }
  }

  async getScoupesWithGeneralPosition() {
    return (await this.scoupeRepository
      .findAll({include: [{model: ScoupeGeneralPosition, include:[User]}, 
                          {model: User, include:[{model: Position}, GeneralPosition, ScoupeGeneralPosition]}]}))
  }

  async setUserForScoupeGeneralPosition(UserID: number, ID: number){
    return await this.scoupeGeneralPositionRepository.update({UserID}, {where: {ID}});
  }
}

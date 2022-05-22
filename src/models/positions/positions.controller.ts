import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import { CreateGeneralPositionDto } from './dto/CreateGeneralPosition.dto';
import { CreatePositionDto } from './dto/CreatePosition.dto';
import { CreatePositionNameDto } from './dto/CreatePositionName.dto';
import { CreateScoupeDto } from './dto/CreateScoupe.dto';
import { CreateScoupeGeneralPositionDto } from './dto/CreateScoupeGeneralPosition.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private positionService: PositionsService) {}

  @Roles('managePositionNames')
  @Post('/create/positionname')
  createPositionName(@Body() posDto: CreatePositionNameDto) {
    return this.positionService.addPositionName(posDto);
  }

  @Roles('managePositionNames')
  @Post('/delete/positionname')
  deletePositionName(@Body() { ID }) {
    return this.positionService.deletePositionName(ID);
  }

  @Roles('manageScoupes')
  @Post('/create/Scoupe')
  createScoupe(@Body() scoupeDto: CreateScoupeDto) {
    return this.positionService.addScoupe(scoupeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/Scoupes')
  getScoupes() {
    return this.positionService.getScoupes();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/departments')
  getDepartments() {
    return this.positionService.getDepartments();
  }

  @Roles('manageDepartments')
  @Post('/create/department')
  createDepartment(@Body() departmentDto: CreateDepartmentDto) {
    try {
      return this.positionService.addDepartment(departmentDto);
    } catch {
      return new HttpException('Не удалоь создать отдел!', 500);
    }
  }

  @Roles('manageDepartments')
  @Post('/delete/department')
  deleteDepartment(@Body() { ID }) {
    try {
      return this.positionService.deleteDepartment(ID);
    } catch {
      return new HttpException('Не удалоь удалить отдел!', 500);
    }
  }

  @Roles('manageScoupes')
  @Post('/delete/scoupe')
  deleteScoupe(@Body() { ID }) {
    try {
      return this.positionService.deleteScoupe(ID);
    } catch {
      return new HttpException('Не удалоь удалить структуру!', 500);
    }
  }

  @Roles('managePositions')
  @UseGuards(JwtAuthGuard)
  @Post('/create/position')
  createPosition(@Request() {user}, @Body() positionDto: CreatePositionDto) {
    try {
      return this.positionService.addPosition(positionDto, user.ScoupeID, user.Permission.Name);
    } catch {
      return new HttpException('Не удалоь создать должность!', 500);
    }
  }

  @Roles('managePositions')
  @Post('/delete/position')
  deletePosition(@Body() { ID }) {
    try {
      return this.positionService.deletePosition(ID);
    } catch {
      return new HttpException('Не удалось удалить должность!', 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/positionnamepositions')
  getPosition(@Body() { ID }) {
    try {
      return this.positionService.getPositionByPositionNameID(ID);
    } catch {
      return new HttpException('Не удалоь получить должности!', 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/positionnames')
  getPositionNames(@Body() { ID }) {
    try {
      return this.positionService.getPositionNames(ID);
    } catch {
      return new HttpException('Не удалоь получить имена должностей!', 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/allpositionnames')
  getAllPositionNames() {
    try {
      return this.positionService.getAllPositionNames();
    } catch {
      return new HttpException('Не удалоь получить имена должностей!', 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/ScoupesWithAllData')
  ScoupesWithAllData() {
    try {
      return this.positionService.getScoupesWithAllData();
    } catch {
      return new HttpException('Не удалоь получить имена должностей!', 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/Scoupe')
  ScoupeWithAllData(@Request() {user}) {
    try {
      return this.positionService.getScoupe(user.ScoupeID);
    } catch {
      return new HttpException('Не удалось получить структуру!', 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get/allpositions')
  getAllPositions() {
    try {
      return this.positionService.getAllPositions();
    } catch {
      return new HttpException('Не удалоь получить имена должностей!', 500);
    }
  }

  @Roles('managePositions')
  @UseGuards(JwtAuthGuard)
  @Post('/update/setUserForPosition')
  setUserForPosition(@Request() {user, body}) {
    try {
      console.log(body)
      return this.positionService.setUserForPosition(body.EmployeeID, body.PositionID, user.Scoupe?.ID, user.Permission?.Name);
    } catch {
      return new HttpException('Не удалоь создать должность!', 500);
    }
  }

    @UseGuards(JwtAuthGuard)
    @Roles('manageGeneralPositions')
    @Post('/create/generalposition')
    createGeneralPosition(@Body() generalPositionDto:CreateGeneralPositionDto) {
      try {
        return this.positionService.addGeneralPosition(generalPositionDto);
      } catch {
        return new HttpException('Не удалоь создать должность!', 500);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Roles('manageGeneralPositions')
    @Post('/create/scoupegeneralposition')
    createScoupeGeneralPosition(@Body() scoupeGeneralPositionDto:CreateScoupeGeneralPositionDto) {
      try {
        return this.positionService.addScoupeGeneralPosition(scoupeGeneralPositionDto);
      } catch {
        return new HttpException('Не удалоь создать должность!', 500);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Roles('manageGeneralPositions')
    @Post('/get/scoupeswithgeneralposition')
    getScoupesWithGeneralPosition() {
      try {
        return this.positionService.getScoupesWithGeneralPosition();
      } 
      catch {
        return new HttpException('Не удалоь получить!', 500);
      }
    }

    
    @Roles('manageGeneralPositions')
    @UseGuards(JwtAuthGuard)
    @Post('/check')
    CheckReq(@Request() {user, body}) {
      
      console.log(user);
      console.log(body);

      return {user, body};
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/freepositions')
    getFreePositions(@Request() {user, body}) {
      console.log(body)
      return this.positionService.getFreePositions(user.ScoupeID, body.DepartmentID, user.Permission.Name);
    }

    @Roles('managment')
    @UseGuards(JwtAuthGuard)
    @Post('/set/ManagerForPositionName')
    setManagerForPositionName(@Request() {body, user})
    {
      return this.positionService.setManagerForPositionName(body.ID, body.ObeyToID);
    }

    @Roles('manageGeneralPositions')
    @UseGuards(JwtAuthGuard)
    @Post('/set/userforscoupegeneralposition')
    setUserForScoupeGeneralPosition(@Request() {body, user})
    {
      return this.positionService.setUserForScoupeGeneralPosition(body.UserID, body.ScoupeID);
    }
    
}

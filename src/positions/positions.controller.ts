import { Body, Controller, HttpException, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import { CreatePositionDto } from './dto/CreatePosition.dto';
import { CreatePositionNameDto } from './dto/CreatePositionName.dto';
import { CreateScoupeDto } from './dto/CreateScoupe.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
    constructor (private positionService: PositionsService){}

    @Roles({addPositions: true})
    @Post('/create/positionname')
    createPositionName(@Body() posDto: CreatePositionNameDto)
    {
        return this.positionService.addPositionName(posDto);
    }

    @Roles({addPositions: true})
    @Post('/delete/positionname')
    deletePositionName(@Body() {ID})
    {
        return this.positionService.deletePositionName(ID);
    }

    @Roles({addPositions: true})
    @Post('/create/Scoupe')
    createScoupe(@Body() scoupeDto: CreateScoupeDto)
    {
        return this.positionService.addScoupe(scoupeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/Scoupe')
    getScoupes()
    {
        return this.positionService.getScoupes();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/departments')
    getDepartments()
    {
        return this.positionService.getDepartments();
    }

    @Roles({addDepartment: true})
    @Post('/create/department')
    createDepartment(@Body() departmentDto: CreateDepartmentDto)
    {
        try{
        return this.positionService.addDepartment(departmentDto);
        }
        catch{return new HttpException('Не удалоь создать отдел!', 500)}
    }

    @Roles({addPositions: true})
    @Post('/delete/department')
    deleteDepartment(@Body() {ID})
    {
        try{
        return this.positionService.deleteDepartment(ID);
        }
        catch{return new HttpException('Не удалоь удалить отдел!', 500)}
    }

    @Roles({addPositions: true})
    @Post('/delete/scoupe')
    deleteScoupe(@Body() {ID})
    {
        try{
        return this.positionService.deleteScoupe(ID);
        }
        catch{return new HttpException('Не удалоь удалить структуру!', 500)}
    }

    @Roles({addPosition: true})
    @Post('/create/position')
    createPosition(@Body() positionDto: CreatePositionDto)
    {
        try{
        return this.positionService.addPosition(positionDto);
        }
        catch{return new HttpException('Не удалоь создать должность!', 500)}
    }

    @Roles({addPosition: true})
    @Post('/delete/position')
    deletePosition(@Body() {ID})
    {
        try{
        return this.positionService.deletePosition(ID);
        }
        catch{return new HttpException('Не удалось удалить должность!', 500)}
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/positionnamepositions')
    getPosition(@Body() {ID})
    {
        try{
        return this.positionService.getPosition(ID);
        }
        catch{return new HttpException('Не удалоь получить должности!', 500)}
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/positionnames')
    getPositionNames(@Body() {ID})
    {
        console.log(ID)
        try{
        return this.positionService.getPositionNames(ID);
        }
        catch{return new HttpException('Не удалоь получить имена должностей!', 500)}
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/allpositionnames')
    getAllPositionNames()
    {
        try{
        return this.positionService.getAllPositionNames();
        }
        catch{return new HttpException('Не удалоь получить имена должностей!', 500)}
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/ScoupesWithAllData')
    ScoupesWithAllData()
    {
        try{
        return this.positionService.getScoupesWithAllData();
        }
        catch{return new HttpException('Не удалоь получить имена должностей!', 500)}
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get/allpositions')
    getAllPositions()
    {
        try{
        return this.positionService.getAllPositions();
        }
        catch{return new HttpException('Не удалоь получить имена должностей!', 500)}
    }



}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permissions.model';

@Injectable()
export class PermissionsService 
{
    constructor(@InjectModel(Permission) private permissionRepository: typeof Permission)
    {

    }

    async createPermission(dto: CreatePermissionDto){
        const permission = await this.permissionRepository.create(dto);
        return permission;
    }

    async getPermissionByName(Name:string){
        const permission = await this.permissionRepository.findOne({where:{Name}});
        return permission;
    }

    async getAllPermissions(){
        const permission = await this.permissionRepository.findAll();
        return permission;
    }
}

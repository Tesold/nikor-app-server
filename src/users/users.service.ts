import { BadRequestException, ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt'
import { Password } from './pass.model';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Permission } from 'src/permissions/permissions.model';
import { BadPassword } from 'src/errors/errors';
import { Op } from 'sequelize';
import { PositionName } from 'src/positions/positionsName.model';
import { Department } from 'src/positions/department.model';

@Injectable()
export class UsersService 
{
    constructor(@InjectModel(User) private userRepository: typeof User, private permissionService: PermissionsService, @InjectModel(Password) private passwordRepository: typeof Password) {}


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

    async createUser(dto: CreateUserDto)
    {   
        if (dto.PasswordHash) {
            const permission = await this.permissionService.getPermissionByName(dto.Permission);
            if(permission)
            {
                const user = await this.userRepository.create(dto);
                const password = await this.createUserPassword(dto.PasswordHash, dto.Salt, dto.Nickname);
                await user.$set('PermissionID', [permission.ID]);
                await user.$set('Password', password);
                return user;
            }
            return new BadRequestException();
        }

        return BadPassword();   
    }

    async getUserByName(Nickname: string, passNeed: boolean)
    {
        switch(passNeed)
        {
            case false: return await this.userRepository.findOne({where: {Nickname}, include: [Permission]});
            case true: {
                const user = await this.userRepository.findOne({where: {Nickname}, include: [Permission, Password]});
            return user;
            }
        }
    }

    async getAllusers()
    {
        return await this.userRepository.findAll({include:{all:true}});
    }

    async getAllusersExcept(Nickname:string)
    {
        return await this.userRepository.findAll({where: {
            Nickname : {
              [Op.ne]: ''
            }}, attributes: {exclude: ['createdAt', 'updatedAt', 'PassID', 'Timezone', 'Nickname']}});
    }

    async createUserPassword(pass:string, salt:string, Nickname:string)
    {
        //try{
            console.log("bcrypt")
            const hash = bcrypt.hashSync(pass, salt);
            const passDto:CreatePasswordDto = {PassHash: hash, Salt: salt};
            const password = await this.passwordRepository.create(passDto);

            return password;
            //}
        /*catch{
            this.userRepository.destroy({where: {Nickname: Nickname}});
            throw "Не удалось создать пароль!"
        }*/

        
    }

    async checkPasswordHash(password:string, salt:string, hash:string)
    {
        if(await bcrypt.hash(hash, salt)===password)
        return true;

        return false;
    }

    async checkPasswordByName(Nickname:string, hash: string)
    {

        const user = await this.getUserByName(Nickname, true);
        if(user&&await bcrypt.hash(hash, user.Password.Salt)===user.Password.PassHash)
        return user;

        return null;
    }
}

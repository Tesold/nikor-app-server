import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {

    constructor(private apiService:ApiService){}

    @UseGuards(JwtAuthGuard)
    @Post('/employeers')
    async Employeers(@Request() req)
    {
        return this.apiService.getEmployeers(req.user.Nickname);
    }
}

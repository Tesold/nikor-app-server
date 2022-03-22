import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/constants';
import { UsersModule } from 'src/models/users/users.module';
import { Department } from './department.model';
import { PositionsController } from './positions.controller';
import { Position } from './positions.model';
import { PositionsService } from './positions.service';
import { PositionName } from './positionsName.model';
import { Scoupe } from './scoupes.model';
import { Subordinate } from './subordinates.model';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, AuthModuleOptions],
  imports: [
    CacheModule.register(),
    forwardRef(()=>UsersModule),
    forwardRef(()=>AuthModule),
    JwtModule.register(
      {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s'}  
      }
    ),
    UsersModule,
    SequelizeModule.forFeature([Department, PositionName, Position, Scoupe, Subordinate])
  ]
})
export class PositionsModule {}

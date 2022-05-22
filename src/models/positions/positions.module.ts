import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/constants';
import { UsersModule } from 'src/models/users/users.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { Department } from './department.model';
import { GeneralPosition } from './generalpositions.model';
import { PositionsController } from './positions.controller';
import { Position } from './positions.model';
import { PositionsService } from './positions.service';
import { PositionName } from './positionsName.model';
import { ScoupeGeneralPosition } from './scoupegeneralpositions.model';
import { Scoupe } from './scoupes.model';
import { Subordinate } from './subordinates.model';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, AuthModuleOptions],
  imports: [
    CacheModule.register(),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionsModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    SequelizeModule.forFeature([
      Department,
      PositionName,
      Position,
      Scoupe,
      Subordinate,
      GeneralPosition,
      ScoupeGeneralPosition
    ]),
  ],
})
export class PositionsModule {}

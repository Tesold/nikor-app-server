import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './department.model';
import { PositionsController } from './positions.controller';
import { Position } from './positions.model';
import { PositionsService } from './positions.service';
import { PositionName } from './positionsName.model';
import { Scoupe } from './scoupes.model';
import { Subordinate } from './subordinates.model';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [
    SequelizeModule.forFeature([Department, PositionName, Position, Scoupe, Subordinate])
  ]
})
export class PositionsModule {}

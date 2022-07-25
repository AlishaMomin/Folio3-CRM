import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { role } from './entity/role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports:[TypeOrmModule.forFeature([role])],
})
export class RoleModule {}

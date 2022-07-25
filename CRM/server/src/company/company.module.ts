import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { company } from './entity/company.entity';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports:[TypeOrmModule.forFeature([company])],
})
export class CompanyModule {}

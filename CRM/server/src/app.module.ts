import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { role } from './role/entity/role.entity';
import { RoleModule } from './role/role.module';
import { company } from './company/entity/company.entity';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { product } from './product/entity/product.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Yaaliallah786!',
    database: 'crm',
    entities: [role, company, product],
    synchronize: true,
  }), CompanyModule, RoleModule, ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

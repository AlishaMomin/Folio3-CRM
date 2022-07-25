import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// role
import { role } from './role/entity/role.entity';
import { RoleModule } from './role/role.module';
// company
import { company } from './company/entity/company.entity';
import { CompanyModule } from './company/company.module';
// product
import { product } from './product/entity/product.entity';
import { ProductModule } from './product/product.module';
// order
import { order } from './order/entity/order.entity';
import { OrderModule } from './order/order.module';
// orderline
import { orderline } from './orderline/entity/orderline.entity';
import { OrderlineModule } from './orderline/orderline.module';
// user
import { user } from './user/entity/user.entity';
import { UserModule } from './user/user.module';




@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Yaaliallah786!',
    database: 'crm',
    entities: [role, company, product, order,orderline,user],
    synchronize: true,
  }), CompanyModule, RoleModule, ProductModule, OrderModule, OrderlineModule, UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

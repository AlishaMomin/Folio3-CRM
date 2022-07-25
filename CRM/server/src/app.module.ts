import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Yaaliallah786!',
    database: 'crm',
    entities: [],
    synchronize: true,
  }), CompanyModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

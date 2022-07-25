import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { company } from './entity/company.entity';
import { role } from './entity/role.entity';

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
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

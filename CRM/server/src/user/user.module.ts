import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([user])],
})
export class UserModule {}

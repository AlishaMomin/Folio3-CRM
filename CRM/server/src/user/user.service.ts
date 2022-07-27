import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Connection, Repository } from 'typeorm';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { user } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectConnection() private readonly connection:Connection,
    ){}
    getU():Promise<user[]>{
        return this.userRepository.find();
    }
    createU(UserCreateDto:userCreateDto){
        return this.userRepository.save(UserCreateDto);
    }
    updateU(UserUpdatedDto:userUpdateDto,id:number){
        return this.userRepository.update(id,UserUpdatedDto);
    }
    showUById(id:number){
        return this.userRepository.findOne({where:{id}});
    }
    deleteU(id:number){
        return this.userRepository.delete(id);
    }
}

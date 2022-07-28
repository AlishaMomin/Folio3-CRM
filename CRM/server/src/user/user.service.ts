import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { user } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
    ){}
    getU():Promise<user[]>{
        return this.userRepository.find();
    }
    createU(UserCreateDto:userCreateDto){
        return this.userRepository.save(UserCreateDto);
    }
    updateU(UserUpdatedDto:userUpdateDto,Id:number){
        return this.userRepository.update(Id,UserUpdatedDto);
    }
    showUByEmail(Email: string): Promise<user> {
        return this.userRepository.findOne({where :{Email: Email}});
    }

    showUById(Id:number){
        return this.userRepository.findOne({where:{Id}});
    }
    deleteU(Id:number){
        return this.userRepository.delete(Id);
    }
}

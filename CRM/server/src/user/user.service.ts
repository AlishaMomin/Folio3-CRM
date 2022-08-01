import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { role } from 'src/role/entity/role.entity';
import { Repository } from 'typeorm';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { user } from './entity/user.entity';
import { validator } from 'validator';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
    ){}
    getU():Promise<user[]>{
        return this.userRepository.find();
    }
    async createU(UserCreateDto:userCreateDto):Promise<user>{

        const exist = await this.userRepository.findOne({where: {Email: UserCreateDto.Email}});
        if(!exist){
            return this.userRepository.save(UserCreateDto);
        }
        else if(exist){
            console.log("exist");
            return;      
        }
        
    }
    updateU(UserUpdatedDto:userUpdateDto,Id:number){
        return this.userRepository.update(Id,UserUpdatedDto);
    }
    async showUByEmail(Email: string): Promise<user> {
        const query =  await this.userRepository.findOne({where :{Email: Email},
            relations: ['Role']
        });
        return query;
    }

    showUById(Id:number){
        return this.userRepository.findOne({where:{Id}});
    }
    deleteU(Id:number){
        return this.userRepository.delete(Id);
    }
}

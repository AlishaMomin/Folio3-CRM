import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Connection, Repository } from 'typeorm';
import { roleCreateDto } from './dto/role-create.dto';
import { roleUpdatedDto } from './dto/role-update.dto';
import { role } from './entity/role.entity';


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(role)
        private roleRepository: Repository<role>,
        @InjectConnection() private readonly connection:Connection,
    ){}

    getR():Promise<role[]>{
        return this.roleRepository.find();
    }
    createR(RoleCreateDto:roleCreateDto){
        return this.roleRepository.save(RoleCreateDto);
    }
    updateR(RoleUpdatedDto:roleUpdatedDto,id:number){
        return this.roleRepository.update(id,RoleUpdatedDto);
    }
    showRById(id:number){
        return this.roleRepository.findOne({where:{id}});
    }
    deleteR(id:number){
        return this.roleRepository.delete(id);
    }

}

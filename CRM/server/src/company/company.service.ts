import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Connection, Repository } from 'typeorm';
import { companyUpdateDto } from './dto/company-update.dto';
import { companyCreateDto } from './dto/company-create.dto';
import { company } from './entity/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(company)
        private companyRepository: Repository<company>,
        @InjectConnection() private readonly connection:Connection,
    ){}
    getC():Promise<company[]>{
        return this.companyRepository.find();
    }
    createC(CompanyCreateDto:companyCreateDto){
        return this.companyRepository.save(CompanyCreateDto);
    }
    updateC(CompanyUpdatedDto:companyUpdateDto,id:number){
        return this.companyRepository.update(id,CompanyUpdatedDto);
    }
    showCById(id:number){
        return this.companyRepository.findOne({where:{id}});
    }
    deleteC(id:number){
        return this.companyRepository.delete(id);
    }
}

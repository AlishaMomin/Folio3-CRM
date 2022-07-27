import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { companyUpdateDto } from './dto/company-update.dto';
import { companyCreateDto } from './dto/company-create.dto';
import { company } from './entity/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(company)
        private companyRepository: Repository<company>,
    ){}
    getC():Promise<company[]>{
        return this.companyRepository.find();
    }
    createC(CompanyCreateDto:companyCreateDto){
        return this.companyRepository.save(CompanyCreateDto);
    }
    updateC(CompanyUpdatedDto:companyUpdateDto,Id:number){
        return this.companyRepository.update(Id,CompanyUpdatedDto);
    }
    showCById(Id:number){
        return this.companyRepository.findOne({where:{Id}});
    }
    deleteC(Id:number){
        return this.companyRepository.delete(Id);
    }
}

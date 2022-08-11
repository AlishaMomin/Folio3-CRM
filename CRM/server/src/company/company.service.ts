import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { companyUpdateDto } from './dto/company-update.dto';
import { companyCreateDto } from './dto/company-create.dto';
import { company } from './entity/company.entity';
import { user } from 'src/user/entity/user.entity';
@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(company)
        private companyRepository: Repository<company>,
    ){}
    async getC():Promise<company[]>{
        const query = this.companyRepository.find({
            relations: ['User']
        })
        // const query = this.companyRepository.createQueryBuilder() // WHERE t3.event = 2019
        // .leftJoinAndSelect(user,'user','company.ID = User.CompanyId')
        // .getRawMany()

        // //
        // .select('tU1.id', 't1_id')
        // .addSelect('t2.id_2', 't2_id_2')
        // .addSelect('t3.event', 't3_event')
        // .addSelect('t4.column1', 't4_column1') // up to this point: SELECT t1.id,t2.id_2,t3.event,t3.column1,t4.column1 FROM table1 t1
        // .innerJoin(User, 't2', 't1.id = t2.id') //INNER JOIN table2 t2 ON t1.id = t2.id
        // .innerJoin(table3, 't3', 't2.event = t3.event') // INNER JOIN table3 t3 ON t2.event = t3.event
        // .innerJoin(table4, 't4', 't4.id = t2.id_2') // INNER JOIN table4 t4 ON t4.id = t2.id_2 
        // .where('t3.event = 2019')
        return query;
    }
    createC(CompanyCreateDto:companyCreateDto){
        return this.companyRepository.save(CompanyCreateDto);
    }
    updateIsDeleteC(CompanyUpdatedDto:any,Id:number){
        // CompanyUpdatedDto.Isdelete = CompanyUpdatedDto['1'];
        console.log(CompanyUpdatedDto)
        return this.companyRepository.update(Id,CompanyUpdatedDto);
    }
    showCById(Id:number){
        return this.companyRepository.findOne({where:{Id}});
    }
    deleteC(Id:number){
        return this.companyRepository.delete(Id);
    }
}

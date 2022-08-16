import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { companyUpdateDto } from './dto/company-update.dto';
import { companyCreateDto } from './dto/company-create.dto';
import { company } from './entity/company.entity';
import { user } from 'src/user/entity/user.entity';
import {TYPE} from "./enums/type.enum";
@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(company)
        private companyRepository: Repository<company>,
    ){}
    async getHC():Promise<company[]>{
        const query = this.companyRepository.find({
            where: {
                Type:TYPE.HOST,
              },
            relations: ['User']
        })
        return query;
    }
    async getCC(Id:number):Promise<company[]>{
        const query = this.companyRepository.find({
            where: {
                Type:TYPE.CLIENT,
                HostCompany:{
                    Id:Id
                }
              },
            relations: ['User']
        })
        return query;
    }
    createC(CompanyCreateDto:companyCreateDto){
        return this.companyRepository.save(CompanyCreateDto);
    }
    updateIsDeleteC(CompanyUpdatedDto:any,Id:number){
        console.log(CompanyUpdatedDto)
        return this.companyRepository.update(Id,CompanyUpdatedDto);
    }



    async showHCById(Id:number):Promise<company>{
        const query = this.companyRepository.findOne({
            where:{
                Id
            },
            relations:['User.OrderSell','ClientCompany.User.OrderBuy.Orderline.Product','Product.Orderline']
        });
        return query;
    }


    async showCCById(Id:number):Promise<company>{
        const query = this.companyRepository.findOne({
            where:{
                Id
            },
            relations:['User.OrderBuy.Orderline.Product','HostCompany.Product']
        });
        return query;
    }
    deleteC(Id:number){
        return this.companyRepository.delete(Id);
    }
}
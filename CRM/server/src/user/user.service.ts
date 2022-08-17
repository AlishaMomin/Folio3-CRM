import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { role } from 'src/role/entity/role.entity';
import { Repository } from 'typeorm';
import { userCreateDto } from './dto/user-create.dto';
import { companyCreateDto } from '../company/dto/company-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { user } from './entity/user.entity';
import { validator } from 'validator';
import { userSigninDto } from './dto/user-signin.dto';
import { company } from 'src/company/entity/company.entity';
import {ISDELETE} from "src/company/enums/Isdelete.enum";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(company)
        private companyRepository: Repository<company>,

    ){}

    getU():Promise<user[]>{
        return this.userRepository.find({
            relations: ['Company']
        });
    }


    async addcompany(CompanyCreateDto:any):Promise <any>{
        
        const companyExist = await this.companyRepository.findOne({where: {Name:CompanyCreateDto.Name}});
        // const exist = await this.userRepository.findOne({where: {Email: UserCreateDto.Email}});
        if(!companyExist){
            console.log(CompanyCreateDto)
            if (CompanyCreateDto['HostCompany'] == 0)
            {
                delete CompanyCreateDto['HostCompany']
            }
            const companySave = this.companyRepository.save(CompanyCreateDto);
            return companySave;
        }
        else if(companyExist){
            console.log("EXISTS");
            return null;
        }
        
    }


    async adduser(UserCreateDto:any):Promise<any>{
        
        const userExist = await this.userRepository.findOne({
            where: {
                Email:UserCreateDto.Email
            }
        });
        if(!userExist){
            console.log(UserCreateDto)
            const userSave = this.userRepository.save(UserCreateDto);
            return userSave;
        }
        else if(userExist)
        {
            console.log("EXISTS");
            return null;
        }
        
    }

    async SignIn(UserSigninDto:userSigninDto):Promise<user>{

        return await this.userRepository.findOne({
            where: {
            Email: UserSigninDto.Email,
            Password:UserSigninDto.Password,
        }
        })
        .then((result)=>{
            if (result){
                return result;
            }
            else{
                throw new HttpException('Account not found',HttpStatus.NOT_FOUND);
            }
        })
        .catch(() => {
            throw new HttpException('Account not found',HttpStatus.NOT_FOUND);
        });
        
    }


    updateU(UserUpdatedDto:userUpdateDto,Id:number){
        return this.userRepository.update(Id,UserUpdatedDto);
    }
    async showUByEmail(Email: string): Promise<user> {
        const query =  await this.userRepository.findOne({
            where :{
                Email: Email,
            },
            relations: ['Role','Company.HostCompany']
        });
        return query;
    }

    showUById(Id:number){
        return this.userRepository.findOne({
            where:{
                Id,
            }
        });
    }


    deleteU(Id:number){
        return this.userRepository.delete(Id);
    }

    deleteC(Id:number){
        return this.companyRepository.delete(Id);
    }
}

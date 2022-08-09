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


    async addcompany(CompanyDetailsDto:any):Promise<any>{
        
        const companyExist = await this.companyRepository.findOne({where: {Name:CompanyDetailsDto["Company"].Name}});
        // const exist = await this.userRepository.findOne({where: {Email: UserCreateDto.Email}});
        if(!companyExist){
            console.log(CompanyDetailsDto["Company"])
            const companysave = this.companyRepository.save(CompanyDetailsDto["Company"]);
           return companysave;
        }
        else if(companyExist){
            console.log(" NOT EXISTS");
        }
        
    }

    async SignIn(UserSigninDto:userSigninDto):Promise<user>{

        return await this.userRepository.findOne({where: {Email: UserSigninDto.Email, Password:UserSigninDto.Password}})
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
        const query =  await this.userRepository.findOne({where :{Email: Email},
            relations: ['Role','Company']
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

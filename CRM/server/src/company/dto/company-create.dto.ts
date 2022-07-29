import { IsString} from 'class-validator';
import { company } from '../entity/company.entity';
export enum TYPE {
    HOST = 0,
    CLIENT = 1,
 }
 export enum ISDELETE{
    ACTIVE = 0,
    DELETE = 1,
}

export class companyCreateDto{
    @IsString()
    Name: string;
    Type:TYPE;
    Isdelete:ISDELETE;
    hostCompany:number;
}
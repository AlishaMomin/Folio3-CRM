import { IsString} from 'class-validator';
import { company } from '../entity/company.entity';
import {TYPE} from "../enums/type.enum";
import { ISDELETE } from "../enums/Isdelete.enum";

export class companyCreateDto{
    // @IsString()
    Name: string;
    Type:TYPE;
    Isdelete:ISDELETE;
    hostCompany:number;
}
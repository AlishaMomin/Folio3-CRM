import { IsString} from 'class-validator';
import {TYPE} from "../enums/type.enum";
import { ISDELETE } from "../enums/Isdelete.enum";

export class companyUpdateDto{
    @IsString()
    Name: string;

    Type:TYPE;
    
    Isdelete:ISDELETE;
}
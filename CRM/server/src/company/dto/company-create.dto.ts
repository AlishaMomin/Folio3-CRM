import { IsString} from 'class-validator';
export enum TYPE {
    HOST = 0,
    CLIENT = 1,
 }
 export enum ISDELETE{
    ACTIVE = 0,
    DELETE = 1,
}

export class companyCreateDto{
    Id: number;
    @IsString()
    Name: string;
    Type:TYPE;
    Isdelete:ISDELETE;
}
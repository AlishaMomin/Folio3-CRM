import {IsString} from 'class-validator';

export class productCreateDto{

    Id:number;

    @IsString()
    Name: string;

    @IsString()
    Sku: string;
}
import {IsInt} from 'class-validator';
export class orderlineCreateDto{

    Id: number;

    @IsInt()
    PerUnitPrice: number;

    @IsInt()
    Amount: number;

    @IsInt()
    Quantity: number;
}
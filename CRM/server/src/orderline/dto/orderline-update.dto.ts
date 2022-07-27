import {IsInt} from 'class-validator';


export class orderlineUpdateDto{
    
    @IsInt()
    PerUnitPrice: number;

    @IsInt()
    Amount: number;

    @IsInt()
    Quantity: number;
}
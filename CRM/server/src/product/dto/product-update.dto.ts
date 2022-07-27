import {IsString} from 'class-validator';

export class productUpdateDto{
    @IsString()
    Name: string;
}
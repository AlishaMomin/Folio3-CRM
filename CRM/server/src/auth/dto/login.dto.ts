import { IsEmail, IsString } from 'class-validator';


export class loginDto{
    @IsEmail()
    Email: string;

    @IsString()
    Password: string;
}
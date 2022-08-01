import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class userSigninDto{

    @IsEmail()
    Email: string;

    @IsString()
    Password: string;
}
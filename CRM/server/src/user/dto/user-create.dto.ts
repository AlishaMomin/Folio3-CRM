import { IsString} from 'class-validator';

export class userCreateDto {
    
    @IsString()
    Name: string;

    @IsString()
    ContactNumber: string;

    @IsString()
    Email: string;

    @IsString()
    Password: string;
}
import { IsString} from 'class-validator';


export class userUpdateDto {
    // id: number;

    @IsString()
    Name: string;

    @IsString()
    ContactNumber: string;

    @IsString()
    Email: string;

    @IsString()
    Password: string;
}
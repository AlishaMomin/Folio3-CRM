import { IsNotEmpty, IsString, Length, Matches} from 'class-validator';

export class userCreateDto {
    
    @IsString()
    Name: string;

    @IsString()
    ContactNumber: string;

    @IsString()
    Email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is mandatory.'})
    @Length(8,30)
    // @Matches(/((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/, {message: 'password too weak'},)
    Password: string
}
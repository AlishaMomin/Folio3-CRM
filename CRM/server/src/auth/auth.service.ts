import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService, 
        private jwtService: JwtService) { }

    async validateUser(Email: string, Password: string) {
        const user = await this.UserService.showUByEmail(Email);
        console.log(user);
        
        if (user && user.Password === Password) {
            return user;    
        }
        return null;
    }

    async login( User: any ){
        const payload = { Email: User.Email, sub: User.Id};  
        return{
            access_token: this.jwtService.sign(payload),
        }
    }
}

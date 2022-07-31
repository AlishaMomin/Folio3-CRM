import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({ usernameField: 'Email', passwordField: 'Password' });
    }

    async validate(Email: string, Password: string): Promise<any> {
        const user = await this.authService.validateUser(Email, Password);
        console.log(user.Role.RoleName)
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
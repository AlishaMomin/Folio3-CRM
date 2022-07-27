import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { userInfo } from 'os';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService) {  }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: any){
        return this.authService.login(req.user);

    }

}

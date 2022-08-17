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
        
        if (user && user.Password === Password && (user.Company === null || user.Company.Isdelete === '0')) {
            return user;    
        }
        return null;
    }

    async login( User: any ){
        const payload = { Email: User.Email, sub: User.Id,RoleName: User. Role.RoleName, Name: User.Name,} ;  
        if (User.Company != null)
        {
            if (User.Company.HostCompany != null)
            {
                console.log(User.Company.HostCompany.Name,"Line 29 auth service")
                return[{
                    access_token: this.jwtService.sign(payload),
                    roleId: User.Role.Id,
                    companyId : User.Company.Id,
                    companyName: User.Company.Name,
                    hostCompanyName:User.Company.HostCompany.Name,
                }]
            }
            else
            {
                return[{
                    access_token: this.jwtService.sign(payload),
                    roleId: User.Role.Id,
                    companyId : User.Company.Id,
                    companyName: User.Company.Name,
                    hostCompanyName:''
                }]
            }
        }
        else
        {
            return[{
                access_token: this.jwtService.sign(payload),
                roleId: User.Role.Id,
                companyId : 0,
                companyName:'',
                hostCompanyName:''
            }]
        }
    }
}

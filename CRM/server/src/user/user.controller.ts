import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards , HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { companyCreateDto } from '../company/dto/company-create.dto';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { userSigninDto } from './dto/user-signin.dto';


@Controller('user')
export class UserController {
    
    constructor(private userService: UserService){}
    // @UseGuards(AuthGuard('jwt'))
    @Get()
    getuser(){
        return this.userService.getU();
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('/addcompany')
    async postcompanywithuser(@Body(ValidationPipe) CompanyDetailsDto:any){
        const newCompanyData = await this.userService.addcompany(CompanyDetailsDto["Company"]);
        if (newCompanyData != null)
        {
            CompanyDetailsDto["Contact1"]["Company"] = newCompanyData.Id;
            CompanyDetailsDto["Contact2"]["Company"] = newCompanyData.Id;

            const newUser1Data = await this.userService.adduser(CompanyDetailsDto["Contact1"]);
            const newUser2Data = await this.userService.adduser(CompanyDetailsDto["Contact2"]);
            if (newUser1Data != null && newUser2Data != null)
            {
                return { status:true, message:"",type:newCompanyData.Type };
            }
            else
            {
                if (newUser1Data != null)
                {
                    const deletedUser1 = await this.userService.deleteU(newUser1Data.Id)
                    const deletedCompany = await this.userService.deleteC(newCompanyData.Id)
                    return {status:false, message:"User 2 email already exists",type:0};
                }
                else if (newUser2Data != null)
                {
                    const deletedUser2 = await this.userService.deleteU(newUser2Data.Id)
                    const deletedCompany = await this.userService.deleteC(newCompanyData.Id)
                    return {status:false, message:"User 1 email already exists",type:0};
                }
                else
                {
                    const deletedCompany = await this.userService.deleteC(newCompanyData.Id)
                    return {status:false, message:"Both users email already exists",type:0};
                }
            }
        }
        else
        {
            return {status:false, message:"Company name already exists",type:0};
        }
    }

    @Post('/signin')
    async signin(@Body() UserSigninDto:userSigninDto){
        return await this.userService.SignIn(UserSigninDto);

    }
    
    // @UseGuards(AuthGuard('jwt'))
    @Patch('/:Id')
    update(@Body() UserUpdatedDto:userUpdateDto,
    @Param('Id',ParseIntPipe) Id:number){
        return this.userService.updateU(UserUpdatedDto,Id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:Id')
    getuserById(@Param('Id')Id:number){
        return this.userService.showUById(Id);
    }


    @Get(':Email')
    getUserByEmail(@Param('Email') Email: string) {
      return this.userService.showUByEmail(Email);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Delete('/:Id')
    deleteuser(@Param('Id',ParseIntPipe)Id:number){
        return this.userService.deleteU(Id);
    }

}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards , HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { ValidationPipe } from 'src/pipes/validation.pipe';
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
    async postuser(@Body(ValidationPipe) UserCreateDto:userCreateDto){
        const response = await this.userService.createU(UserCreateDto);
        if(response === undefined) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Email already exists',
            }, HttpStatus.FORBIDDEN);
        }
        else{
            console.log("Yes");
            return "posted"
        }

    }

    @Post('/signin')
    async signin(@Body() UserSigninDto:userSigninDto){
        return await this.userService.signinU(UserSigninDto);

    }
    
    @UseGuards(AuthGuard('jwt'))
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

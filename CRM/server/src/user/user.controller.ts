import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getuser(){
        return this.userService.getU();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    postuser(@Body() UserCreateDto:userCreateDto){
        return this.userService.createU(UserCreateDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    update(@Body() UserUpdatedDto:userUpdateDto,
    @Param('id',ParseIntPipe) id:number){
        return this.userService.updateU(UserUpdatedDto,id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    getuserById(@Param('id')id:number){
        return this.userService.showUById(id);
    }


    @Get(':Email')
    getUserByEmail(@Param('Email') Email: string) {
      return this.userService.showUByEmail(Email);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteuser(@Param('id',ParseIntPipe)id:number){
        return this.userService.deleteU(id);
    }

}

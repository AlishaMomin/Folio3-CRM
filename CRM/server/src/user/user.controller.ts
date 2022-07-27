import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { userCreateDto } from './dto/user-create.dto';
import { userUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    getuser(){
        return this.userService.getU();
    }

    @Post()
    postuser(@Body() UserCreateDto:userCreateDto){
        return this.userService.createU(UserCreateDto);
    }

    @Patch('/:id')
    update(@Body() UserUpdatedDto:userUpdateDto,
    @Param('id',ParseIntPipe) id:number){
        return this.userService.updateU(UserUpdatedDto,id);
    }

    @Get('/:id')
    getuserById(@Param('id')id:number){
        return this.userService.showUById(id);
    }


    @Get(':Email')
    getUserByEmail(@Param('Email') Email: string) {
      return this.userService.showUByEmail(Email);
    }

    @Delete('/:id')
    deleteuser(@Param('id',ParseIntPipe)id:number){
        return this.userService.deleteU(id);
    }

}

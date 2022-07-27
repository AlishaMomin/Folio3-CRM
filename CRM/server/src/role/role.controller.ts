import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { roleCreateDto } from './dto/role-create.dto';
import { roleUpdatedDto } from './dto/role-update.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService){}

    @Get()
    getrole(){
        return this.roleService.getR();
    }

    @Post()
    postrole(@Body() RoleCreateDto:roleCreateDto){
        return this.roleService.createR(RoleCreateDto);
    }

    @Patch('/:id')
    update(@Body() RoleUpdatedDto:roleUpdatedDto,
    @Param('id',ParseIntPipe) id:number){
        return this.roleService.updateR(RoleUpdatedDto,id);
    }

    @Get('/:id')
    getRoleById(@Param('id')id:number){
        return this.roleService.showRById(id);
    }

    @Delete('/:id')
    deleterole(@Param('id',ParseIntPipe)id:number){
        return this.roleService.deleteR(id);
    }
    
}

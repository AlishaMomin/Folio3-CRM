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

    @Patch('/:Id')
    update(@Body() RoleUpdatedDto:roleUpdatedDto,
    @Param('Id',ParseIntPipe) Id:number){
        return this.roleService.updateR(RoleUpdatedDto,Id);
    }

    @Get('/:Id')
    getRoleById(@Param('Id')Id:number){
        return this.roleService.showRById(Id);
    }

    @Delete('/:Id')
    deleterole(@Param('Id',ParseIntPipe)Id:number){
        return this.roleService.deleteR(Id);
    }
    
}

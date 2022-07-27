import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CompanyService } from './company.service';
import { companyUpdateDto } from './dto/company-update.dto';
import { companyCreateDto } from './dto/company-create.dto';

@Controller('company')
export class CompanyController {
    constructor(private companyservice: CompanyService){}

    @Get()
    getcompany(){
        return this.companyservice.getC();
    }
    @Post()
    postcompany(@Body() CompanyCreateDto:companyCreateDto){
        return this.companyservice.createC(CompanyCreateDto);
    }
    @Patch('/:id')
    update(@Body() CompanyUpdatedDto:companyUpdateDto,
    @Param('id',ParseIntPipe) id:number){
        return this.companyservice.updateC(CompanyUpdatedDto,id);
    }
    @Get('/:id')
    getcompanyById(@Param('id')id:number){
        return this.companyservice.showCById(id);
    }
    @Delete('/:id')
    deletecompany(@Param('id',ParseIntPipe)id:number){
        return this.companyservice.deleteC(id);
    }


}

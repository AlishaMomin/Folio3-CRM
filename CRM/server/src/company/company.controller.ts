import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req ,UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { CompanyService } from './company.service';
import { companyUpdateDto } from './dto/company-update.dto';
import { companyCreateDto } from './dto/company-create.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('company')
export class CompanyController {
    constructor(private companyservice: CompanyService){}
    // @Roles(Role.Admin)
    // @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Get('/h')
    async gethostcompany(){
        return await this.companyservice.getHC();
    }
    
    @Get('/c/:Id')
    async getclientcompany(@Param('Id')Id:number){
        return await this.companyservice.getCC(Id);
    }
    
    
    @Post()
    postcompany(@Body() CompanyCreateDto:companyCreateDto){
        return this.companyservice.createC(CompanyCreateDto);
    }
    @Patch('/:Id')
    updateIsDelete(@Body() CompanyUpdatedDto:any,
    @Param('Id',ParseIntPipe) Id:number){
        return this.companyservice.updateIsDeleteC(CompanyUpdatedDto,Id);
    }
    @Get('/:Id')
    getcompanyById(@Param('Id')Id:number){
        return this.companyservice.showCById(Id);
    }
    @Delete('/:Id')
    deletecompany(@Param('Id',ParseIntPipe)Id:number){
        return this.companyservice.deleteC(Id);
    }


}

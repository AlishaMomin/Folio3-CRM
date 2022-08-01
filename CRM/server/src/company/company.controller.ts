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
    @Roles(Role.Admin)
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Get()
    getcompany(){
        return this.companyservice.getC();
    }
    
    @Post('/addclient')
    postcompany(@Body() CompanyCreateDto:companyCreateDto){
        console.log('checking');
        return this.companyservice.createC(CompanyCreateDto);
    }
    @Patch('/:Id')
    update(@Body() CompanyUpdatedDto:companyUpdateDto,
    @Param('Id',ParseIntPipe) Id:number){
        return this.companyservice.updateC(CompanyUpdatedDto,Id);
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

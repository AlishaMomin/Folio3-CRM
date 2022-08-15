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
    @Get('/h')
    async gethostcompany(){
        return await this.companyservice.getHC();
    }
    @Roles(Role.Host)
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Get('/c/:Id')
    async getclientcompany(@Param('Id')Id:number){
        return await this.companyservice.getCC(Id);
    }
    
    @Roles(Role.Admin,Role.Host)
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Post()
    postcompany(@Body() CompanyCreateDto:companyCreateDto){
        return this.companyservice.createC(CompanyCreateDto);
    }

    @Roles(Role.Admin,Role.Host)
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Patch('/:Id')
    updateIsDelete(@Body() CompanyUpdatedDto:any,
    @Param('Id',ParseIntPipe) Id:number){
        return this.companyservice.updateIsDeleteC(CompanyUpdatedDto,Id);
    }
    
    @Get('/:Id')
    async getcompanyById(@Param('Id')Id:number){
        const query = await this.companyservice.showCById(Id);
        const clients = query['ClientCompany'].length;
        const products = query['Product'].length;
        let sales = 0;
        let orders = 0;
        let PaymentType = [{label:"CASH",value:0},{label:"CHEQUE",value:0},{label:"ONLINE",value:0}];
        for (let i=0 ;i < query['User'].length;i++)
        {
            orders = orders + query['User'][i]['OrderSell'].length;
            for (let j=0;j < query['User'][i]['OrderSell'].length;j++)
            {
                if (query['User'][i]['OrderSell'][j]['InvoiceStatus'] === 'paid')
                {
                    if (query['User'][i]['OrderSell'][j]['TransactionType'] === 'cash')
                    {
                        PaymentType[0]['value']++;
                    }
                    else if (query['User'][i]['OrderSell'][j]['TransactionType'] === 'cheque')
                    {
                        PaymentType[1]['value']++;
                    }
                    else if (query['User'][i]['OrderSell'][j]['TransactionType'] === 'online')
                    {
                        PaymentType[2]['value']++;
                    }
                }
                sales = sales + Number(query['User'][i]['OrderSell'][j]['TotalAmount']);
            }
        }
        let Products = []
        for (let i= 0;i<query['Product'].length;i++)
        {
            let quantity = 0;
            for (let j = 0; j < query['Product'][i]['Orderline'].length;j++)
            {
                quantity = quantity + Number(query['Product'][i]['Orderline'][j]['Quantity']);
            }
            Products.push({label:query['Product'][i]['Name'],value:quantity})
        }
        // return query;
        return {clients,products,sales,orders,Products,PaymentType};
    }

    // @Delete('/:Id')
    // deletecompany(@Param('Id',ParseIntPipe)Id:number){
    //     return this.companyservice.deleteC(Id);
    // }


}

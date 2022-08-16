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
        let Products = []
        let ProductsList = [];
        for (let i= 0;i<query['Product'].length;i++)
        {
            let quantity = 0;
            for (let j = 0; j < query['Product'][i]['Orderline'].length;j++)
            {
                quantity = quantity + Number(query['Product'][i]['Orderline'][j]['Quantity']);
            }
            ProductsList.push(query['Product'][i]['Name']);
            Products.push({label:query['Product'][i]['Name'],value:quantity});
        }
        let sales = 0;
        let orders = 0;
        let dateObj = new Date();
        
        
        let Dates = [];
        let SalesData = [];
        for (let i=0;i<12;i++)
        {
            let year  = dateObj.getFullYear();
            let monthvalue = (dateObj.getMonth() -10  + i);
            if (monthvalue<1 )
            {
                monthvalue+=12;
                year = year-1;
            }
            let month = String(monthvalue).padStart(2, '0');
            let day = String(1).padStart(2, '0');
            
            Dates.push(year + '-' + month + '-' + day);
        }
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
                for (let k = 0; k < 11;k++)
                {
                    if (SalesData[k] == null)
                    {
                        SalesData[k] = 0;
                    }
                    if (Dates[k] <= query['User'][i]['OrderSell'][j]['DateOfOrder'] && Dates[k+1] > query['User'][i]['OrderSell'][j]['DateOfOrder'])
                    {
                        SalesData[k] = SalesData[k] + Number(query['User'][i]['OrderSell'][j]['TotalAmount']);
                    }
                }
                sales = sales + Number(query['User'][i]['OrderSell'][j]['TotalAmount']);
            }
        }


        let ClientInterest = [];
        for (let i=0 ;i < query['ClientCompany'].length;i++)
        {
            let data = [];
            let name = query['ClientCompany'][i]['Name']
            for (let m = 0;m < query['ClientCompany'][i]['User'].length;m++)
            {
                for (let j=0;j < query['ClientCompany'][i]['User'][m]['OrderBuy'].length;j++)
                {
                    for (let k = 0; k < query['ClientCompany'][i]['User'][m]['OrderBuy'][j]['Orderline'].length;k++)
                    {
                        for (let l = 0;l < ProductsList.length;l++)
                        {
                            if (data[l] == null)
                            {
                                data[l] = 0;
                            }
                            if (query['ClientCompany'][i]['User'][m]['OrderBuy'][j]['Orderline'][k]['Product'] !== undefined && ProductsList[l] === query['ClientCompany'][i]['User'][m]['OrderBuy'][j]['Orderline'][k]['Product']['Name'])
                            {
                                data[l] = data[l] + query['ClientCompany'][i]['User'][m]['OrderBuy'][j]['Orderline'][k]['Quantity'];
                            }
                        }
                        
                    }
                }
                
            }
            if (data.length !== ProductsList.length)
            {
                for (let j = 0;j< ProductsList.length;j++)
                {
                    data[j] = 0;
                }
            }
            ClientInterest.push({name,data});

        }
        let removedDate  = Dates.shift();
        // return query;
        return {sales,orders,Products,PaymentType,ClientInterest,ProductsList,Dates,SalesData};
    }

    // @Delete('/:Id')
    // deletecompany(@Param('Id',ParseIntPipe)Id:number){
    //     return this.companyservice.deleteC(Id);
    // }


}

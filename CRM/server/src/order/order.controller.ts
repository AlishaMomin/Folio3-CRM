import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from './order.service';
import { orderCreateDto } from './dto/order-create.dto'; 

@Controller('order')
export class OrderController {
    constructor(private orderservice: OrderService){}

    @Get('/h/:Id')
    getRecievablesorder(@Param('Id')Id:number){
        return this.orderservice.getOH(Id);
    }


    @Get('/c/:Id')
    getTransactionsorder(@Param('Id')Id:number){
        const query = this.orderservice.getOC(Id);
        return query;
    }

    
    // @Post()
    // postorder(@Body() OrderCreateDto:orderCreateDto){
    //     return this.orderservice.createO(OrderCreateDto);
    // }
    
    @Get('/:Id')
    getorderById(@Param('Id')Id:number){
        return this.orderservice.getOById(Id);
    }
    
    @Patch('/:Id')
    updatepayment(@Body() OrderUpdatedPaymentDto:any,
    @Param('Id',ParseIntPipe) Id:number){
        return this.orderservice.updateOrderPayment(OrderUpdatedPaymentDto,Id);
    }

    // @Delete('/:Id')
    // deleteorder(@Param('Id',ParseIntPipe)Id:number){
    //     return this.orderservice.deleteO(Id);
    // }
}

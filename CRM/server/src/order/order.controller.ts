import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from './order.service';
import { orderCreateDto } from './dto/order-create.dto';
import { orderUpdateDto } from './dto/order-update.dto'; 

@Controller('order')
export class OrderController {
    constructor(private orderservice: OrderService){}

    @Get()
    getorder(){
        return this.orderservice.getO();
    }
    @Post()
    postorder(@Body() OrderCreateDto:orderCreateDto){
        return this.orderservice.createO(OrderCreateDto);
    }
    @Patch('/:Id')
    update(@Body() OrderUpdatedDto:orderUpdateDto,
    @Param('Id',ParseIntPipe) Id:number){
        return this.orderservice.updateO(OrderUpdatedDto,Id);
    }
    @Get('/:Id')
    getorderById(@Param('Id')Id:number){
        return this.orderservice.getOById(Id);
    }
    @Delete('/:Id')
    deleteorder(@Param('Id',ParseIntPipe)Id:number){
        return this.orderservice.deleteO(Id);
    }
}

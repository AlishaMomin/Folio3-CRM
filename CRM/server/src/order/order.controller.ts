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
    @Patch('/:id')
    update(@Body() OrderUpdatedDto:orderUpdateDto,
    @Param('id',ParseIntPipe) id:number){
        return this.orderservice.updateO(OrderUpdatedDto,id);
    }
    @Get('/:id')
    getorderById(@Param('id')id:number){
        return this.orderservice.showOById(id);
    }
    @Delete('/:id')
    deleteorder(@Param('id',ParseIntPipe)id:number){
        return this.orderservice.deleteO(id);
    }
}

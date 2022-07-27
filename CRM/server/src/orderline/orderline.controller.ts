import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { OrderlineService } from './orderline.service';
import { orderlineCreateDto } from './dto/orderline-create.dto';
import { orderlineUpdateDto } from './dto/orderline-update.dto';

@Controller('orderline')
export class OrderlineController {
    constructor(private orderlineservice: OrderlineService){}

    @Get()
    getorderline(){
        return this.orderlineservice.getOL();
    }
    @Post()
    postorderline(@Body() OrderlineCreateDto:orderlineCreateDto){
        return this.orderlineservice.createOL(OrderlineCreateDto);
    }
    @Patch('/:id')
    update(@Body() OrderlineUpdatedDto:orderlineUpdateDto,
    @Param('id',ParseIntPipe) id:number){
        return this.orderlineservice.updateOL(OrderlineUpdatedDto,id);
    }
    @Get('/:id')
    getorderlineById(@Param('id')id:number){
        return this.orderlineservice.showOLById(id);
    }
    @Delete('/:id')
    deleteorderline(@Param('id',ParseIntPipe)id:number){
        return this.orderlineservice.deleteOL(id);
    }

}

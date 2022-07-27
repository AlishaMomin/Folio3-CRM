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
    @Patch('/:Id')
    update(@Body() OrderlineUpdatedDto:orderlineUpdateDto,
    @Param('Id',ParseIntPipe) Id:number){
        return this.orderlineservice.updateOL(OrderlineUpdatedDto,Id);
    }
    @Get('/:Id')
    getorderlineById(@Param('Id')Id:number){
        return this.orderlineservice.showOLById(Id);
    }
    @Delete('/:Id')
    deleteorderline(@Param('Id',ParseIntPipe)Id:number){
        return this.orderlineservice.deleteOL(Id);
    }

}

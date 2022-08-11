import { Injectable } from '@nestjs/common';
import {InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import {Repository } from 'typeorm';
import { orderlineCreateDto } from './dto/orderline-create.dto';
import { orderlineUpdateDto } from './dto/orderline-update.dto';
import { orderline } from './entity/orderline.entity';

@Injectable()
export class OrderlineService {
    constructor(
        @InjectRepository(orderline)
        private orderlineRepository: Repository<orderline>,
    ){}

    getOL():Promise<orderline[]>{
        return this.orderlineRepository.find({
            relations:['Product']
        });
    }
    createOL(OrderlineCreateDto:orderlineCreateDto){
        return this.orderlineRepository.save(OrderlineCreateDto);
    }
    updateOL(OrderlineUpdatedDto:orderlineUpdateDto,Id:number){
        return this.orderlineRepository.update(Id,OrderlineUpdatedDto);
    }
    getOLById(Id:number){
        return this.orderlineRepository.findOne({
            where:{
                Id
            },
            relations:['Product']

        });
    }
    deleteOL(Id:number){
        return this.orderlineRepository.delete(Id);
    }
}

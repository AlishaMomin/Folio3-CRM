import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Connection, Repository } from 'typeorm';
import { orderlineCreateDto } from './dto/orderline-create.dto';
import { orderlineUpdateDto } from './dto/orderline-update.dto';
import { orderline } from './entity/orderline.entity';

@Injectable()
export class OrderlineService {
    constructor(
        @InjectRepository(orderline)
        private orderlineRepository: Repository<orderline>,
        @InjectConnection() private readonly connection:Connection,
    ){}

    getOL():Promise<orderline[]>{
        return this.orderlineRepository.find();
    }
    createOL(OrderlineCreateDto:orderlineCreateDto){
        return this.orderlineRepository.save(OrderlineCreateDto);
    }
    updateOL(OrderlineUpdatedDto:orderlineUpdateDto,id:number){
        return this.orderlineRepository.update(id,OrderlineUpdatedDto);
    }
    showOLById(id:number){
        return this.orderlineRepository.findOne({where:{id}});
    }
    deleteOL(id:number){
        return this.orderlineRepository.delete(id);
    }
}

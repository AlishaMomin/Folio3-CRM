import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Connection, Repository } from 'typeorm';
import { orderCreateDto } from './dto/order-create.dto'; 
import { orderUpdateDto } from './dto/order-update.dto'; 
import { order } from './entity/order.entity';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order)
        private orderRepository: Repository<order>,
        @InjectConnection() private readonly connection:Connection,
    ){}

    getO():Promise<order[]>{
        return this.orderRepository.find();
    }
    createO(OrderCreateDto:orderCreateDto){
        return this.orderRepository.save(OrderCreateDto);
    }
    updateO(OrderUpdatedDto:orderUpdateDto,id:number){
        return this.orderRepository.update(id,OrderUpdatedDto);
    }
    showOById(id:number){
        return this.orderRepository.findOne({where:{id}});
    }
    deleteO(id:number){
        return this.orderRepository.delete(id);
    }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orderCreateDto } from './dto/order-create.dto'; 
import { orderUpdateDto } from './dto/order-update.dto'; 
import { order } from './entity/order.entity';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order)
        private orderRepository: Repository<order>,
    ){}

    getO():Promise<order[]>{
        return this.orderRepository.find();
    }
    createO(OrderCreateDto:orderCreateDto){
        return this.orderRepository.save(OrderCreateDto);
    }
    updateO(OrderUpdatedDto:orderUpdateDto,Id:number){
        return this.orderRepository.update(Id,OrderUpdatedDto);
    }
    getOById(Id:number){
        return this.orderRepository.findOne({
            where:{
                Id
            },
            relations: ['Orderline.Product']
        });
    }
    deleteO(Id:number){
        return this.orderRepository.delete(Id);
    }

}

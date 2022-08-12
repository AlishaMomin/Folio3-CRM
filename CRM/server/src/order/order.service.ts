import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orderCreateDto } from './dto/order-create.dto'; 
import { order } from './entity/order.entity';
import { invoicestatus } from './enums/invoicestatus.enum';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order)
        private orderRepository: Repository<order>,
    ){}

    getOC(Id:number):Promise<order[]>{
        return this.orderRepository.find({  
            where :{
                Buyer:
                {
                    Company:
                    {
                        Id:Id
                    }
                }
        },
        });
    }

    getOH(Id:number):Promise<order[]>{
        return this.orderRepository.find({  
            where :{
                Seller:
                {
                    Company:
                    {
                        Id:Id
                    }
                },
                InvoiceStatus:invoicestatus.UNPAID,
        },
        });
    }

    createO(OrderCreateDto:orderCreateDto){
        return this.orderRepository.save(OrderCreateDto);
    }
    
    getOById(Id:number){
        return this.orderRepository.findOne({
            where:{
                Id:Id,
            },
            relations: ['Orderline.Product']
        });
    }
    deleteO(Id:number){
        return this.orderRepository.delete(Id);
    }

}

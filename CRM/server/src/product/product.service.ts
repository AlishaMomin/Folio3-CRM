import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { product } from './entity/product.entity';
import { Request } from 'express';
import { productCreateDto } from './dto/product-create.dto';
import { productUpdateDto } from './dto/product-update.dto';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(product)
        private productRepository: Repository<product>,
        @InjectConnection() private readonly connection:Connection,
    ){}

    getP():Promise<product[]>{
        return this.productRepository.find();
    }
    createP(ProductCreateDto:productCreateDto){
        return this.productRepository.save(ProductCreateDto);
    }
    updateP(ProductUpdatedDto:productUpdateDto,id:number){
        return this.productRepository.update(id,ProductUpdatedDto);
    }
    showPById(id:number){
        return this.productRepository.findOne({where:{id}});
    }
    deleteP(id:number){
        return this.productRepository.delete(id);
    }




}

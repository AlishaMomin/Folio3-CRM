import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { product } from './entity/product.entity';
import { Request } from 'express';
import { productCreateDto } from './dto/product-create.dto';
import { productUpdateDto } from './dto/product-update.dto';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(product)
        private productRepository: Repository<product>,
    ){}

    // getP():Promise<product[]>{
    //     return this.productRepository.find();
    // }
    // createP(ProductCreateDto:productCreateDto){
    //     return this.productRepository.save(ProductCreateDto);
    // }
    // updateP(ProductUpdatedDto:productUpdateDto,Id:number){
    //     return this.productRepository.update(Id,ProductUpdatedDto);
    // }
    showPById(companyId:number){
        return this.productRepository.find({where:{
                Company:{
                    Id:companyId
                }
        }
    });
    }
    // deleteP(Id:number){
    //     return this.productRepository.delete(Id);
    // }




}

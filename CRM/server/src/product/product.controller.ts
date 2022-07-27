import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { productCreateDto } from './dto/product-create.dto';
import { productUpdateDto } from './dto/product-update.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private productservice:ProductService){}

    @Get()
    getproduct(){
        return this.productservice.getP();
    }
    @Post()
    postproduct(@Body() ProductCreateDto:productCreateDto){
        return this.productservice.createP(ProductCreateDto);
    }
    @Patch('/:id')
    update(@Body() ProductUpdatedDto:productUpdateDto,
    @Param('id',ParseIntPipe) id:number){
        return this.productservice.updateP(productUpdateDto,id);
    }

    @Get('/:id')
    getProductById(@Param('id')id:number){
        return this.productservice.showPById(id);
    }

    @Delete('/:id')
    deleteProduct(@Param('id',ParseIntPipe)id:number){
        return this.productservice.deleteP(id);
    }


}

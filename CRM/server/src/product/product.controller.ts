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
    @Patch('/:Id')
    update(@Body() ProductUpdatedDto:productUpdateDto,
    @Param('Id',ParseIntPipe) Id:number){
        return this.productservice.updateP(ProductUpdatedDto,Id);
    }

    @Get('/:Id')
    getProductById(@Param('Id')Id:number){
        return this.productservice.showPById(Id);
    }

    @Delete('/:Id')
    deleteProduct(@Param('Id',ParseIntPipe)Id:number){
        return this.productservice.deleteP(Id);
    }

}

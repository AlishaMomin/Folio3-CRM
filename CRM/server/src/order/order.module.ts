import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([order])],
})
export class OrderModule {}

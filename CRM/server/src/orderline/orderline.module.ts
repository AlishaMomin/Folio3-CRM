import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderline } from './entity/orderline.entity';
import { OrderlineController } from './orderline.controller';
import { OrderlineService } from './orderline.service';

@Module({
  controllers: [OrderlineController],
  providers: [OrderlineService],
  imports: [TypeOrmModule.forFeature([orderline])],
})
export class OrderlineModule {}

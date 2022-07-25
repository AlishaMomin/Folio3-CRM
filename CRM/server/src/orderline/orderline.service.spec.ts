import { Test, TestingModule } from '@nestjs/testing';
import { OrderlineService } from './orderline.service';

describe('OrderlineService', () => {
  let service: OrderlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderlineService],
    }).compile();

    service = module.get<OrderlineService>(OrderlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

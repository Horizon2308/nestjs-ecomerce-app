import { Body, Controller, Post, Query } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { OrderService } from './order.service';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  async placeOrder(@Body() dto: OrderDto) {
    this.orderService.placeOrder(dto);
  }
}

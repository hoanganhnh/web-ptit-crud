import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Auth } from '../../common/decorators/auth.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Role } from '../../shared/enum/role';
import type { User as UserEntity } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Auth(Role.USER)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.createOrder(createOrderDto);
    return order;
  }

  @Get(':id')
  findOneOrderById(@Param('id') id: string) {
    return this.ordersService.findOneById(id);
  }

  @Auth(Role.USER)
  @Post('my-orders')
  findMyOrders(@User() user: UserEntity) {
    return this.ordersService.findMyOrders(user.id);
  }

  @Auth(Role.USER)
  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOrderById(@Param('id') id: string) {
    return this.ordersService.deleteOrderById(id);
  }
}

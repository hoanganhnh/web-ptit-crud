import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.contoller';
import { Order } from './order.enity';
import { OrdersService } from './orders.service';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Book])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}

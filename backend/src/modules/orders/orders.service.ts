import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.enity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    const oderIsExisted = await this.orderRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        book: {
          id: createOrderDto.bookId,
        },
      },
    });

    if (oderIsExisted) {
      return await this.updateOrder(oderIsExisted.id, {
        amount: oderIsExisted.amount + createOrderDto.amount,
      });
    }
    const order = await this.orderRepository.create({
      ...createOrderDto,
      user,
      book: {
        id: createOrderDto.bookId,
      },
    });
    return await this.orderRepository.save(order);
  }

  async findOneById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['book'],
    });
    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({ id, ...updateOrderDto });
    return await this.orderRepository.save(order);
  }

  async findMyOrders(userId: string) {
    const orders = await this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['book'],
    });
    return orders;
  }

  async deleteOrderById(id: string) {
    return await this.orderRepository.delete(id);
  }
}

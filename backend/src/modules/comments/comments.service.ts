import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(user: User, createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      user,
      book: {
        id: createCommentDto.bookId,
      },
    });
    return await this.commentRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  async findOneById(id: number) {
    return await this.commentRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      id,
      ...updateCommentDto,
    });
    return await this.commentRepository.save(comment);
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id);
  }
}

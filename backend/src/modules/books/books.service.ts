import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOneById(id: string) {
    const book = await this.bookRepository.findOne({ where: { id } });
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({ id, ...updateBookDto });
    return await this.bookRepository.save(book);
  }

  async remove(id: string) {
    return await this.bookRepository.delete(id);
  }
}

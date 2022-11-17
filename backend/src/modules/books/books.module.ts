import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { LocalFile } from './entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, LocalFile])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

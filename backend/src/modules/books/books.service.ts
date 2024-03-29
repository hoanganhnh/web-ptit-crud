import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { CreateLocalFileDto } from './dto/create-local-file.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { LocalFile } from './entities/local-file.entity';
import { removeFile } from '../../utils/delete-file-local';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(LocalFile)
    private readonly localFileRepository: Repository<LocalFile>,
    private configService: ConfigService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const dto = createBookDto.imageId
      ? {
          ...createBookDto,
          image: {
            id: createBookDto.imageId,
          },
        }
      : { ...createBookDto };
    const book = await this.bookRepository.create(dto);

    return await this.bookRepository.save(book);
  }

  async createBookWithImage(
    createBookDto: CreateBookDto,
    creareFileDataDto: CreateLocalFileDto,
  ) {
    const localFile = await this.createLocalFile(creareFileDataDto);
    const book = await this.bookRepository.create({
      ...createBookDto,
      image: localFile,
    });
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOneById(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({ id, ...updateBookDto });
    return await this.bookRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOneById(id);
    await this.bookRepository.remove(book);

    if (book.image) {
      await this.deleteLocalFile(book.image.id);
    }
    return book;
  }

  async createLocalFile(creareFileDataDto: CreateLocalFileDto) {
    const domain = this.configService.get<string>('URL_SERVER');
    const url = domain + creareFileDataDto.path.replace('public', '');

    const localFile = await this.localFileRepository.create({
      ...creareFileDataDto,
      url,
    });

    return await this.localFileRepository.save(localFile);
  }

  async addImg(bookId: number, creareFileDataDto: CreateLocalFileDto) {
    const image = await this.createLocalFile(creareFileDataDto);
    const book = await this.bookRepository.preload({
      id: bookId,
      image: {
        id: image.id,
      },
    });
    return await this.bookRepository.save(book);
  }

  async removeImgInBook(bookId: number) {
    const book = await this.bookRepository.preload({
      id: bookId,
      image: null,
    });
    return await this.bookRepository.save(book);
  }

  async findLocalFileById(id: string) {
    const localFile = await this.localFileRepository.findOne({ where: { id } });
    return localFile;
  }

  async deleteLocalFile(id: string) {
    const localFile = await this.findLocalFileById(id);
    const deleteResult = await this.localFileRepository.remove(localFile);
    void removeFile(localFile.path);
    return deleteResult;
  }
}

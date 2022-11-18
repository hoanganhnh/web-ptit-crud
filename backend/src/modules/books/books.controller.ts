import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';
import { FileTypeImageValidationPipe } from './pipes/file-type-image.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          callback(null, `${filename}${extension}`);
        },
      }),
      limits: {
        fileSize: Math.pow(1024, 2),
      },
    }),
  )
  async createImageBook(
    @UploadedFile('file', FileTypeImageValidationPipe, FileSizeValidationPipe)
    file: Express.Multer.File,
  ) {
    const localFile = await this.booksService.createLocalFile({
      path: file.path.replace('public', ''),
      filename: file.originalname,
      mimetype: file.mimetype,
    });

    return localFile;
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          callback(null, `${filename}${extension}`);
        },
      }),
      limits: {
        fileSize: Math.pow(1024, 2),
      },
    }),
  )
  async addImg(
    @Param('id') id: string,
    @UploadedFile('file', FileTypeImageValidationPipe, FileSizeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.booksService.addImg(+id, {
      path: file.path.replace('public', ''),
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }
}

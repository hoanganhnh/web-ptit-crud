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
  HttpCode,
  HttpStatus,
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
import { Auth } from '../../common/decorators/auth.decorator';
import { Role } from '../../shared/enum/role';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Auth(Role.ADMIN)
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
      path: file.path,
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

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Auth(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Auth(Role.ADMIN)
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
  async addImgBook(
    @Param('id') id: string,
    @UploadedFile('file', FileTypeImageValidationPipe, FileSizeValidationPipe)
    file: Express.Multer.File,
  ) {
    return this.booksService.addImg(+id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Auth(Role.ADMIN)
  @Delete('image/:id')
  async deleteLocalFile(@Param('id') id: string) {
    const result = await this.booksService.deleteLocalFile(id);
    return result;
  }
}

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  PayloadTooLargeException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const maxSize = Math.pow(1024, 2); // 1MB;
    // "value" is an object containing the file's attributes and metadata
    if (value.size > maxSize) {
      throw new PayloadTooLargeException('File too large');
    } else {
      return value;
    }
  }
}

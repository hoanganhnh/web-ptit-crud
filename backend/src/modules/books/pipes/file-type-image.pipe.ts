import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileTypeImageValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value || !value.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      throw new BadRequestException('Provide a invalid image !');
    } else {
      return value;
    }
  }
}

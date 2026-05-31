import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateBannerDto } from '../../banners/types/banners.dto';

@Injectable()
export class Base64ImageValidationPipe implements PipeTransform {
  private readonly allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
  private readonly maxSize = 5 * 1024 * 1024;

  transform(value: CreateBannerDto) {
    const { imageBase64 } = value;

    const matches = imageBase64.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new BadRequestException('Invalid base64 image format');
    }

    const extension = matches[1].toLowerCase();
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(`Extension ${extension} is not allowed`);
    }

    const buffer = Buffer.from(matches[2], 'base64');
    if (buffer.length > this.maxSize) {
      throw new BadRequestException('Image size is too large (max 5MB)');
    }

    return value;
  }
}

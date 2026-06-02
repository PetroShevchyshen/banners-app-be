import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва не може бути порожньою' })
  @MinLength(2, { message: 'Назва мінімум 2 символи' })
  @MaxLength(100, { message: 'Назва максимум 100 символів' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Зображення обовʼязкове' })
  imageBase64!: string;
}

export class UpdateBannerDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Назва мінімум 2 символи' })
  @MaxLength(100, { message: 'Назва максимум 100 символів' })
  title?: string;

  @IsOptional()
  @IsString()
  imageBase64?: string;
}

export interface Banner {
  id: string;
  title: string;
  imageBase64: string;
  createdAt: string;
  updatedAt: string;
}

export type BannersDB = {
  data: Banner[];
};

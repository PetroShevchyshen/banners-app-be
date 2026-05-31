import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BannerService } from './banners.service';
import type {
  Banner,
  BannersDB,
  CreateBannerDto,
  UpdateBannerDto,
} from './types/banners.dto';
import { Base64ImageValidationPipe } from '../common/pipe/base64-image-validation.pipe';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannerService) {}

  @Get()
  async findAll(): Promise<BannersDB> {
    return await this.bannersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Banner> {
    return await this.bannersService.findOne(id);
  }

  @Post()
  async create(
    @Body(Base64ImageValidationPipe) dto: CreateBannerDto,
  ): Promise<Banner> {
    return await this.bannersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(Base64ImageValidationPipe) updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    return await this.bannersService.update(id, updateBannerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.bannersService.remove(id);
  }
}

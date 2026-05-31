import { Module } from '@nestjs/common';
import { BannersController } from './banners.controller';
import { BannerService } from './banners.service';

@Module({
  providers: [BannerService],
  controllers: [BannersController],
})
export class BannersModule {}

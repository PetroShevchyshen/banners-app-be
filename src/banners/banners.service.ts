import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import type {
  Banner,
  BannersDB,
  CreateBannerDto,
  UpdateBannerDto,
} from './types/banners.dto';

@Injectable()
export class BannerService {
  private readonly dbPath = path.join(process.cwd(), 'db', 'banners.json');

  private async readBanners(): Promise<BannersDB> {
    try {
      const raw = await fs.readFile(this.dbPath, 'utf-8');
      return JSON.parse(raw) as BannersDB;
    } catch (err: any) {
      if (err.code === 'ENOENT') return this.initializeDb();
      throw err;
    }
  }

  private async initializeDb(): Promise<BannersDB> {
    const dbDir = path.dirname(this.dbPath);
    await fs.mkdir(dbDir, { recursive: true });
    const initialData = { data: [] };
    await this.writeBanners(initialData);
    return initialData;
  }

  private async writeBanners(banners: BannersDB): Promise<void> {
    await fs.writeFile(this.dbPath, JSON.stringify(banners, null, 2), 'utf-8');
  }

  async findAll(): Promise<BannersDB> {
    return this.readBanners();
  }

  async findOne(id: string): Promise<Banner> {
    const banners = await this.readBanners();
    const banner = banners.data.find((b) => b.id === id);
    if (!banner) {
      throw new NotFoundException(`Banner with id "${id}" not found`);
    }
    return banner;
  }

  async create(dto: CreateBannerDto): Promise<Banner> {
    const banners = await this.readBanners();
    const now = new Date().toISOString();
    const newBanner: Banner = {
      id: randomUUID(),
      title: dto.title,
      imageBase64: dto.imageBase64,
      createdAt: now,
      updatedAt: now,
    };
    banners.data.push(newBanner);
    await this.writeBanners(banners);
    return newBanner;
  }

  async update(id: string, dto: UpdateBannerDto): Promise<Banner> {
    const banners = await this.readBanners();
    const index = banners.data.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Banner with id "${id}" not found`);
    }
    banners.data[index] = {
      ...banners.data[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    await this.writeBanners(banners);
    return banners.data[index];
  }

  async remove(id: string): Promise<void> {
    const banners = await this.readBanners();
    const index = banners.data.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Banner with id "${id}" not found`);
    }
    banners.data.splice(index, 1);
    await this.writeBanners(banners);
  }
}

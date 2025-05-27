// src/products/products.controller.ts
import {
  Controller, Post, Get, Param, Body, Put, Delete, Query, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${unique}${ext}`);
      },
    }),
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.service.create({
      ...body,
      imageUrl: file ? `/uploads/products/${file.filename}` : null,
    });
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.service.remove(id);
    return { message: 'Product deleted successfully' };
  }
}

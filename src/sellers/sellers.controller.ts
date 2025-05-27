import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Seller } from './seller.entity';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Body() data: Partial<Seller>): Promise<Seller> {
    return this.sellersService.create(data);
  }

  @Get()
  findAll(): Promise<Seller[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Seller> {
    return this.sellersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Seller>): Promise<Seller> {
    return this.sellersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sellersService.remove(+id);
  }
}

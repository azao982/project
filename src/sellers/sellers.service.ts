import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  create(data: Partial<Seller>): Promise<Seller> {
    const seller = this.sellerRepository.create(data);
    return this.sellerRepository.save(seller);
  }

  findAll(): Promise<Seller[]> {
    return this.sellerRepository.find();
  }

  async findOne(id: number): Promise<Seller> {
    const seller = await this.sellerRepository.findOne({ where: { id } });
    if (!seller) throw new NotFoundException(`Seller ID ${id} not found`);
    return seller;
  }

  async update(id: number, data: Partial<Seller>): Promise<Seller> {
    const seller = await this.findOne(id);
    Object.assign(seller, data);
    return this.sellerRepository.save(seller);
  }

  async remove(id: number): Promise<void> {
    const seller = await this.findOne(id);
    await this.sellerRepository.remove(seller);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenants.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(data);
    return this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findByCode(code: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { code } });
  }
}

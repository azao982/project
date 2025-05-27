// src/tenants/tenants.controller.ts
import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Tenant } from './tenants.entity';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() data: Partial<Tenant>): Promise<Tenant> {
    return this.tenantsService.create(data);
  }

  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }

 @Get(':code')
async findByCode(@Param('code') code: string): Promise<Tenant> {
  const tenant = await this.tenantsService.findByCode(code);
  if (!tenant) {
    throw new NotFoundException(`Aucun tenant trouvé avec le code : ${code}`);
  }
  return tenant;
}}
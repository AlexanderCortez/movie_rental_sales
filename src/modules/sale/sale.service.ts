import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>
  ) {}

  findAll(): Promise<Sale[]> {
    return this.saleRepository.find({
      relations: ['movie', 'user'],
    });
  }

  buyAMovie(): Promise<Sale> {
    return this.saleRepository.findOne();
  }
}
import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@entities/sale.entity';
import { Repository } from 'typeorm';
import { SaleDTO } from '@sale-module/dto/sale.dto';

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

  buyAMovie(entry: SaleDTO): Promise<Sale> {
    return this.saleRepository.save(entry);
  }
}
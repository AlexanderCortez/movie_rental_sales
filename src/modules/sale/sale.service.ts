import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Sale } from '@entities/sale.entity';
import { Repository } from 'typeorm';
import { SaleDTO } from '@sale-module/dto/sale.dto';
import { ILog } from '@log-module/interface/log.interface';
import { User } from '@entities/user.entity';
import { momentConstants } from '@config/constants/constants';

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

  buildLogDescription(
    sale: Sale,
    user: User
  ): ILog {
    const formattedDate = moment()
      .tz(momentConstants.timezone)
      .format(momentConstants.logsDateFormat);
    const description = `User: "${user.email}" rented
      Movie: ${sale.movie.title}
      Date: ${formattedDate}
      Quantity: ${sale.quantity}`;
    return {
      entity: 'Sale',
      reference: sale.id,
      description,
    }
  }
}
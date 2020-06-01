import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from '@entities/rent.entity';
import { ILog } from '@log-module/interface/log.interface';
import { momentConstants } from '@config/constants/constants';
import { User } from '@entities/user.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>
  ) {}

  findAll(): Promise<Rent[]> {
    return this.rentRepository.find({
      relations: ['movie', 'user'],
    })
  }

  findById(id: number): Promise<Rent> {
    return this.rentRepository.findOne({
      relations: ['movie', 'user'],
      where: { id }
    })
  }

  rentAMovie(entry): Promise<Rent> {
    return this.rentRepository.save(entry);
  }

  async deliver(id: number) {
    const rent = await this.findById(id);
    rent.delivered = true;
    rent.deliveredOn = moment().tz(momentConstants.timezone).toDate();
    return this.rentRepository.save(rent);
  }

  checkPendingDelivery(userId: number, movieId: number): Promise<Rent> {
    return this.rentRepository.findOne({
      where: {
        delivered: false,
        movie: movieId,
        user: userId,
      }
    })
  }

  buildLogDescription(
    rent: Rent,
    user: User
  ): ILog {
    const formattedDate = moment(rent.rentedOn)
      .tz(momentConstants.timezone)
      .format(momentConstants.logsDateFormat);
    const description = `User: "${user.email}" rented
      Movie: ${rent.movie.title}
      Date: ${formattedDate}
      Quantity: ${rent.quantity}`;
    return {
      entity: 'Rent',
      reference: rent.id,
      description,
    }
  }
}
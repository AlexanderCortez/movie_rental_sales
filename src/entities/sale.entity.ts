import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/user.entity';
import { Movie } from '@entities/movie.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantity: number;

  @Column("double precision")
  cost: number;

  @ManyToOne(() => Movie)
  @JoinColumn()
  movie: Movie;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
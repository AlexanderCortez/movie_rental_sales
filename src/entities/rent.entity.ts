import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from '@entities/movie.entity';
import { User } from '@entities/user.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie)
  @JoinColumn()
  movie: Movie;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: false })
  delivered: boolean;

  @Column({ nullable: true })
  deliveredOn: Date;

  @Column({ default: 1 })
  timeframeInDays: number;

  @Column({ nullable: true })
  shouldBeDeliveredOn: Date;

  @Column('double precision')
  cost: number;

  @Column('double precision', { nullable: true })
  monetaryPenaltyOnDelay: number;
  
  @Column('double precision', { nullable: true })
  monetaryPenaltyPaid: number;

  @Column()
  rentedOn: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
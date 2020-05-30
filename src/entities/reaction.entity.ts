import { Entity,
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
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie)
  @JoinColumn()
  movie: Movie;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: false })
  like: boolean;

  @Column({ default: false })
  dislike: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
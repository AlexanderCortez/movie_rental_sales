import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '@entities/role.entity'


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;
  
  @Column({ nullable: true })
  resetPasswordExpires: number;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(partial?: Partial<object>) {
    Object.assign(this, partial);
  }
}
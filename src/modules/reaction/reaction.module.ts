import { Module } from '@nestjs/common';
import { ReactionService } from '@reaction-module/reaction.service';
import { ReactionController } from '@reaction-module/reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from '@entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionController],
  providers: [ReactionService]
})
export class ReactionModule {}
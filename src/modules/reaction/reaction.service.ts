import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from '@entities/reaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  findAll(): Promise<Reaction[]> {
    return this.reactionRepository.find({
      relations: ['user', 'movie']
    });
  }

  findById(id: number): Promise<Reaction> {
    return this.reactionRepository.findOne({
      relations: ['user', 'movie'],
      where: { id }
    });
  }

  findByUserAndMovie(userId: number, movieId: number): Promise<Reaction> {
    return this.reactionRepository.findOne({
      relations: ['user', 'movie'],
      where: {
        movie: movieId,
        user: userId,
      }
    });
  }

  createAReaction(entry: object): Promise<Reaction> {
    return this.reactionRepository.save(entry); 
  }

  async likeAMovie(reactionId: number): Promise<Reaction> {
    const reaction = await this.findById(reactionId);
    reaction.dislike = false;
    reaction.like = true;
    return this.reactionRepository.save(reaction);
  }

  async dislikeAMovie(reactionId: number): Promise<Reaction> {
    const reaction = await this.findById(reactionId);
    reaction.dislike = true;
    reaction.like = false;
    return this.reactionRepository.save(reaction);
  }
}
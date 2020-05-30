import { Test, TestingModule } from '@nestjs/testing';
import { ReactionService } from '@reaction-module/reaction.service';
import { ReactionController } from '@reaction-module/reaction.controller';
import { Reaction } from '@entities/reaction.entity';
import factory from '@test-factory/index';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Reaction Controller', () => {
  let reactionService: ReactionService;
  let reactionController: ReactionController;

  beforeAll(async () => {
    const reaction: TestingModule = await Test
      .createTestingModule({
        controllers: [ReactionController],
        providers: [
          ReactionService,
          {
            provide: getRepositoryToken(Reaction),
            useFactory: jest.fn(),
          }
        ]
      })
      .compile();
    
    reactionController = reaction.get<ReactionController>(ReactionController);
    reactionService = reaction.get<ReactionService>(ReactionService);
  });

  describe('GET /reactions', () => {
    it('should return all movies', async (done) => {
      const reactions: Reaction[] = await factory(Reaction).makeMany(5);
      
      jest
        .spyOn(reactionService, 'findAll')
        .mockResolvedValue(reactions);

      const response: Reaction[] = await reactionController.findAll();
      expect(response).toEqual(reactions);
      done();
    });
  });
});

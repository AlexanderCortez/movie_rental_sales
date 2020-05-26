import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('Movie Controller' , () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeAll(async () => {
    const app: TestingModule = await Test
      .createTestingModule({
        imports: [],
        controllers: [MovieController],
        providers: [MovieService],
      }).compile();

    movieController = app.get<MovieController>(MovieController);
    movieService = app.get<MovieService>(MovieService);
    jest
      .spyOn(movieService, 'index')
      .mockImplementation(() => ({ ok: true }));
  })
  
  describe('/ (GET)', () => {
    it('show return', () => {
      const response = movieController.index();
    })
  });
});
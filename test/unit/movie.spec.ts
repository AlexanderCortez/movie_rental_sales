import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from '@movie-module/movie.controller';
import { MovieService } from '@movie-module/movie.service';
import { Movie } from '@entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import factory from '@test-factory/index';
import { SaleService } from '@sale-module/sale.service';
import { Sale } from '@entities/sale.entity';
import { User } from '@entities/user.entity';
import { SaleBodyCreateDTO } from '@sale-module/dto/sale-body-create.dto';
import { Rent } from '@entities/rent.entity';
import { RentService } from '@rent-module/rent.service';
import { RentBodyCreateDTO } from '@rent-module/dto/rent-body-create.dto';


describe('Movie Controller' , () => {
  let movieController: MovieController;
  let movieService: MovieService;
  let saleService: SaleService;
  let rentService: RentService;

  beforeAll(async () => {
    const app: TestingModule = await Test
      .createTestingModule({
        controllers: [MovieController],
        providers: [
          {
            provide: getRepositoryToken(Movie),
            useFactory: jest.fn()
          },
          {
            provide: getRepositoryToken(Sale),
            useFactory: jest.fn()
          },
          {
            provide: getRepositoryToken(Rent),
            useFactory: jest.fn()
          },
          MovieService,
          SaleService,
          RentService,
        ],
      }).compile();

    movieController = app.get<MovieController>(MovieController);
    movieService = app.get<MovieService>(MovieService);
    saleService = app.get<SaleService>(SaleService);
    rentService = app.get<RentService>(RentService);
  })
  
  describe('GET /movies', () => {
    it('show return all movies', async (done) => {
      const movies = await factory(Movie).makeMany(2);
      jest
        .spyOn(movieService, 'findAll')
        .mockResolvedValue(movies)
      const response: Movie[] = await movieController.findAll();
      expect(response.length).toBe(movies.length);
      expect(response).toEqual(movies);
      done();
    })
  });

  describe('POST /movies', () => {
    it('should create a movie', async (done) => {
      const movie = await factory(Movie).make();
      jest
        .spyOn(movieService, 'create')
        .mockResolvedValue(movie)
      const response: Movie = await movieController.create(movie);
      expect(response).toEqual(movie);
      done();
    })
  });

  describe('GET /movies/:id', () => {
    it('should return a movie', async (done) => {
      const movie = await factory(Movie).make();
      jest
        .spyOn(movieService, 'findOne')
        .mockResolvedValue(movie);
      const response: Movie = await movieController.findOne({ id: movie.id });
      expect(response.id).toEqual(movie.id);
      expect(response).toEqual(movie);
      done();
    })
  });

  describe('PUT /movies/:id', () => {
    it('should update a movie', async (done) => {
      const movie = await factory(Movie).make();
      jest
        .spyOn(movieService, 'update')
        .mockResolvedValue(movie);
      jest
        .spyOn(movieService, 'findOne')
        .mockResolvedValue(movie);
      const response: Movie = await movieController.update({ id: movie.id }, movie);
      expect(response.id).toEqual(movie.id);
      expect(response).toEqual(movie);
      done();
    })
  });

  describe('DEL /movies/:id', () => {
    it('should inactivate a movie', async (done) => {
      const movie = await factory(Movie).make();
      jest
        .spyOn(movieService, 'update')
        .mockResolvedValue(movie);
      jest
        .spyOn(movieService, 'findOne')
        .mockResolvedValue(movie);
      jest
        .spyOn(movieService, 'inactivate')
        .mockResolvedValue(movie);
      const response: Movie = await movieController.update({ id: movie.id }, movie);
      expect(response.id).toEqual(movie.id);
      expect(response).toEqual(movie);
      done();
    })
  });

  describe('POST /movies/:id/buy', () => {
    it('should buy a movie', async (done) => {
      const movie = await factory(Movie).make();
      const user = await factory(User).make();
      const sale = await factory(Sale).make();
      jest
        .spyOn(saleService, 'buyAMovie')
        .mockResolvedValue(sale);
      jest
        .spyOn(movieService, 'findOne')
        .mockResolvedValue(movie);
      const body: SaleBodyCreateDTO = {
        quantity: 12,
      }
      const response: Sale = await movieController.buyAMovie({ user }, { id: movie.id }, body)
      expect(response).toEqual(sale);
      done();
    })
  });

  describe('POST /movies/:id/rent', () => {
    it('should rent a movie', async (done) => {
      const movie = await factory(Movie).make();
      const user = await factory(User).make();
      const rent = await factory(Rent).make();
      jest
        .spyOn(rentService, 'rentAMovie')
        .mockResolvedValue(rent);
      jest
        .spyOn(movieService, 'findOne')
        .mockResolvedValue(movie);
      jest
        .spyOn(movieService, 'InOrDecreaseStock')
        .mockResolvedValue(movie);
      jest
        .spyOn(rentService, 'checkPendingDelivery')
        .mockResolvedValue(null);
      const body: RentBodyCreateDTO = {
        quantity: 12,
        timeframeInDays: 1,
        monetaryPenaltyOnDelay: 5.6,
      }
      const response: Rent = await movieController
        .rentAMovie({ user }, { id: movie.id }, body);
      expect(response).toEqual(rent);
      done();
    })
  });

  describe('POST /movies/:id/deliver', () => {
    it('should deliver a movie', async (done) => {
      const rent: Rent = await factory(Rent).make();
      const user: User = await factory(User).make();

      jest
        .spyOn(rentService, 'findById')
        .mockResolvedValue(rent);

      jest
        .spyOn(rentService, 'checkPendingDelivery')
        .mockResolvedValue(rent);

      jest
        .spyOn(rentService, 'deliver')
        .mockResolvedValue(rent);

      const response = await movieController
        .deliver({ user }, { id: rent.id });
      
      expect(response).toEqual(rent);
      done();
    });
  });
});
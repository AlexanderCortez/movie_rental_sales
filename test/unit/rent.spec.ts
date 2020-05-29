import { Test, TestingModule } from '@nestjs/testing';
import { RentController } from '@rent-module/rent.controller';
import { RentService } from '@rent-module/rent.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rent } from '@entities/rent.entity';
import factory from '@test-factory/index';

describe('Rent Controller', () => {
  let rentController: RentController;
  let rentService: RentService;

  beforeAll(async () => {
    const rent: TestingModule = await Test
      .createTestingModule({
        providers: [
          RentService,
          {
            provide: getRepositoryToken(Rent),
            useFactory: jest.fn(),
          }
        ],
        controllers: [RentController]
      })
      .compile();
    
    rentController = rent.get<RentController>(RentController);
    rentService = rent.get<RentService>(RentService);
  });

  describe('GET /rents', () => {
    it('should return all rents', async (done) => {
      const rents: Rent[] = await factory(Rent).makeMany(5);
      jest
        .spyOn(rentService, 'findAll')
        .mockResolvedValue(rents);

      const response: Rent[] = await rentController.findAll();
      expect(response).toEqual(rents);
      done();
    });
  });

  describe('POST /rents/:id/deliver', () => {
    it('should deliver a rent', async (done) => {
      const rent: Rent = await factory(Rent).make();
      jest
        .spyOn(rentService, 'findById')
        .mockResolvedValue(rent);

      const response = await rentController.deliver({ id: rent.id });
      expect(response).toEqual(rent);
      done();
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from '@sale-module/sale.controller';
import { SaleService } from '@sale-module/sale.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from '@entities/sale.entity';
import factory from '@test-factory/index';

describe('Sale Controller', () => {
  let saleController: SaleController;
  let saleService: SaleService;

  beforeAll(async () => {
    const sale: TestingModule = await Test
      .createTestingModule({
        controllers: [SaleController],
        providers: [
          SaleService,
          {
            provide: getRepositoryToken(Sale),
            useFactory: jest.fn(),
          }
        ]
      })
      .compile();

    saleController = sale.get<SaleController>(SaleController);
    saleService = sale.get<SaleService>(SaleService);
  });

  describe('GET /sales', () => {
    it('should retrieve all movies', async (done) => {
      const sales = await factory(Sale).makeMany(5);
      jest
        .spyOn(saleService, 'findAll')
        .mockResolvedValue(sales);
      const response: Sale[] = await saleController.findAll();
      expect(response).toEqual(sales);
      done();
    });
  });
});

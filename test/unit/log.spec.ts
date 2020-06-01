import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from '@log-module/log.controller';
import { LogService } from '@log-module/log.service';
import factory from '@test-factory/index';
import { Log } from '@entities/log.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Log Controller', () => {
  let logController: LogController;
  let logService: LogService;

  beforeAll(async () => {
    const log: TestingModule = await Test
      .createTestingModule({
        controllers: [LogController],
        providers: [
          LogService,
          { provide: getRepositoryToken(Log), useFactory: jest.fn() }
        ]
      })
      .compile();
    
    logController = log.get<LogController>(LogController);
    logService = log.get<LogService>(LogService);
  });

  describe('GET /logs', () => {
    it('should return all logs', async (done) => {
      const logs: Log[] = await factory(Log).makeMany(5);

      jest
        .spyOn(logService, 'findAll')
        .mockResolvedValue(logs);
      const response: Log[] = await logController.findAll();
      expect(response).toEqual(logs);
      done();
    });
  });
});

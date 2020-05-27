import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '@role-module/role.controller';
import { RoleService } from '@role-module/role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '@entities/role.entity';
import factory from '../factories';

describe('User Controller', () => {
  let roleController: RoleController;
  let roleService: RoleService;
  beforeAll(async () => {
    const role: TestingModule = await Test
      .createTestingModule({
        controllers: [RoleController],
        providers: [
          RoleService,
          {
            provide: getRepositoryToken(Role),
            useFactory: jest.fn(),
          }
        ]
      }).compile();

    roleController = role.get<RoleController>(RoleController);
    roleService = role.get<RoleService>(RoleService);
  })

  describe('GET /roles', () => {
    it('should return all roles', async (done) => {
      const roles = await factory(Role).makeMany(2);
      jest
        .spyOn(roleService, 'findAll')
        .mockResolvedValue(roles);
      const response: Role[] = await roleController.findAll();
      expect(response).toEqual(roles);
      done();
    });
  });

});

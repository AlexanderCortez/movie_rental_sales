import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@user-module/user.controller';
import { UserService } from '@user-module/user.service';
import { RoleService } from '@role-module/role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Role } from '@entities/role.entity';
import factory from '../factories';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;
  let roleService: RoleService;
  beforeAll(async () => {
    const user: TestingModule = await Test
      .createTestingModule({
        controllers: [UserController],
        providers: [
          UserService,
          RoleService,
          {
            provide: getRepositoryToken(User),
            useFactory: jest.fn(),
          },
          {
            provide: getRepositoryToken(Role),
            useFactory: jest.fn(),
          },
        ]
      }).compile();
    
    userController = user.get<UserController>(UserController);
    userService = user.get<UserService>(UserService);
    roleService = user.get<RoleService>(RoleService);
  })

  describe('POST /users', () => {
    it('should create a user', async (done) => {
      const user = await factory(User).make();
      const role = await factory(Role).make();
      jest
        .spyOn(roleService, 'findByName')
        .mockResolvedValue(role)
      jest
        .spyOn(userService, 'create')
        .mockResolvedValue(user);
      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue(null);
      const response: User = await userController.create({
        roleName: 'admin',
        user,
      });
      expect(response).toEqual(user);
      done();
    });
  });
});

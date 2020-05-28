import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@auth-module/auth.controller';
import { AuthService } from '@auth-module/auth.service';
import { UserService } from '@user-module/user.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { jwtConstants } from '@auth-module/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@auth-module/local.strategy';
import { JwtStrategy } from '@auth-module/jwt.strategy';
import { RoleService } from '@role-module/role.service';
import { Role } from '@entities/role.entity';
import factory from '../factories';

describe.only('Auth Controller', () => {
  let authController: AuthController;
  let userService: UserService;
  let roleService: RoleService;

  beforeAll(async () => {
    const auth: TestingModule = await Test
      .createTestingModule({
        controllers: [AuthController],
        imports: [
          PassportModule,
          JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
              expiresIn: jwtConstants.expiresIn,
            },
          })
        ],
        providers: [
          AuthService,
          LocalStrategy,
          JwtStrategy,
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
      })
      .compile();
    
    authController = auth.get<AuthController>(AuthController);
    userService = auth.get<UserService>(UserService);
    roleService = auth.get<RoleService>(RoleService);
  });

  describe('POST /auth/signin', () => {
    it('should sign in a user', async (done) => {
      const user: User = await factory(User).make();
      const response = await authController.signIn({ user });
      expect(response).toHaveProperty('accessToken');
      expect(response).toHaveProperty('user', user);
      done();
    });
  });

  describe('POST /auth/singup', () => {
    it('should sign up a new user', async (done) => {
      const user: User = await factory(User).make();
      const role: Role = await factory(Role).make();
      jest
      .spyOn(userService, 'findByEmail')
      .mockResolvedValue(null);
      jest
      .spyOn(userService, 'count')
      .mockResolvedValue(0);
      jest
      .spyOn(userService, 'create')
      .mockResolvedValue(user);
      jest
        .spyOn(roleService, 'findByName')
        .mockResolvedValue(role);
      const response = await authController.signup(user)
      expect(response).toBe(user);
      done();
    });
  });
});

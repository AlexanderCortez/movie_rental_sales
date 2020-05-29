import { SetMetadata } from '@nestjs/common';

type allowdRoles = 'admin' | 'user';

type roleTypes = (...roles: allowdRoles[]) => string;

export const Roles = (...roles: Parameters<roleTypes>) => SetMetadata('roles', roles);
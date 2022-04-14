import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (role: object) => SetMetadata(ROLES_KEY, role);

import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/models/permissions/permissions.model';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: object[]) => SetMetadata(ROLES_KEY, roles);
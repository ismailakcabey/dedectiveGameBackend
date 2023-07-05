import { SetMetadata } from "@nestjs/common";
import { Role } from "../user/user.enum";

export const ROLE_KEY = 'role';
export const Roles = (...role:Role[]) => SetMetadata(ROLE_KEY,role)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Role } from '../../users/dto/role.enum';
// import { ROLES_KEY } from '../../users/decorators/roles.decorator';
// import { UsersService } from '../../users/users.service';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private readonly userService: UsersService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     const userFull = await this.userService.findMe(user.id);
//     return requiredRoles.some((role) => [userFull.role_name]?.includes(role));
//   }
// }

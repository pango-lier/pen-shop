import { PickType } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { User } from '../entities/user.entity';
import { SyncPermissionDto } from './add-permission.dto';
import { CreateProfileDto } from './create-profile.dto';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
  'username',
  'refreshToken',
  'rememberToken',
  'is_active',
  'shop_id',
]) {
  // address: CreateAddressDto[];
  profile?: CreateProfileDto;
  permissions?: SyncPermissionDto[];
}

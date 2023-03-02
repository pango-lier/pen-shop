import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
export class UpdateActiveUserDto extends PickType(CreateUserDto, ['is_active']) { }
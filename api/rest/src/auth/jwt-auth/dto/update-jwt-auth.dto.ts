import { PartialType } from '@nestjs/swagger';
import { CreateJwtAuthDto } from './create-jwt-auth.dto';

export class UpdateJwtAuthDto extends PartialType(CreateJwtAuthDto) {}

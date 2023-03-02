import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProfilesController, UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersStore } from './users.store';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService, UsersStore],
  exports: [UsersService, UsersStore],
})
export class UsersModule {}

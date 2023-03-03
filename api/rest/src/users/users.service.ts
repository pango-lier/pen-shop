import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateActiveUserDto, UpdateUserDto } from './dto/update-user.dto';
import Fuse from 'fuse.js';

import { User } from './entities/user.entity';
import usersJson from '@db/users.json';
import { paginate } from 'src/common/pagination/paginate';
import { UsersStore } from './users.store';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';

const users = plainToClass(User, usersJson);

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
const fuse = new Fuse(users, options);

@Injectable()
export class UsersService {
  constructor(private readonly userStore: UsersStore) {}
  private users: User[] = users;

  async create(createUserDto: CreateUserDto) {
    return await this.userStore.create(createUserDto);
  }

  async getUsers(paginate: IPaginate): Promise<UserPaginator> {
    return await this.userStore.findPaginate(paginate);
  }

  async findOne(id: number) {
    return await this.userStore.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userStore.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userStore.repo().softDelete(id);
  }

  makeAdmin(user_id: string) {
    return this.users.find((u) => u.id === Number(user_id));
  }

  async banUser(id: number) {
    const update: UpdateActiveUserDto = {
      is_active: false,
    };
    return await this.userStore.update(id, update);
  }

  async activeUser(id: number) {
    const update: UpdateActiveUserDto = {
      is_active: true,
    };
    return await this.userStore.update(id, update);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersStore {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: number) {
    return await this.userRepo.findOne({
      where: [{ id }],
    });
  }

  async findByUsername(username: string) {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  async createNewUser(createUserDto: CreateUserDto) {
    return await this.userRepo.create(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}

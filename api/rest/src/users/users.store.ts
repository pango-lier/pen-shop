import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateActiveUserDto, UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';

@Injectable()
export class UsersStore {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly paginate: PaginateService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const create = this.userRepo.create(createUserDto)
    return await this.userRepo.save(create);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const create = await this.userRepo.findOne({ where: { id } });
    return await this.userRepo.save({ ...create, ...updateUserDto });
  }

  async findById(id: number) {
    return await this.userRepo.findOne({
      where: [{ id }],
    });
  }

  async findPaginate(paginate: IPaginate) {
    const query = this.userRepo.createQueryBuilder('users');
    query.leftJoinAndSelect('users.permissions', 'permissions');
    return await this.paginate.queryFilter(query, paginate, ['id', 'email', 'name'], { defaultTable: 'users', getQuery: 'getMany' });
  }

  async findByUsername(username: string) {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  async createNewUser(createUserDto: CreateUserDto) {
    return await this.userRepo.create(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto | UpdateActiveUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  repo() {
    return this.userRepo;
  }
}

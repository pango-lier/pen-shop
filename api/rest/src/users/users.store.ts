import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateActiveUserDto, UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginateService } from 'src/common/paginate/paginate.service';
import { IPaginate } from 'src/common/paginate/interface/paginate.interface';
import { AddStaffDto } from './dto/add-staff.dto';
import { encodePwd } from 'src/common/utils/bcrypt';

@Injectable()
export class UsersStore {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly paginate: PaginateService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const create = this.userRepo.create(createUserDto);
    return await this.userRepo.save(create);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const create = await this.userRepo.findOne({ where: { id } });
    return await this.userRepo.save({ ...create, ...updateUserDto });
  }

  async findById(id: number) {
    return await this.userRepo.findOne({
      where: [{ id }],
      relations: {
        permissions: true,
      },
    });
  }

  async findByIdOrFailed(id: number) {
    try {
      return await this.userRepo.findOne({
        where: [{ id }],
        relations: {
          permissions: true,
        },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async findPaginate(paginate: IPaginate) {
    const query = this.userRepo.createQueryBuilder('users');
    query.leftJoinAndSelect('users.permissions', 'permissions');
    return await this.paginate.queryFilter(
      query,
      paginate,
      ['id', 'email', 'name'],
      { defaultTable: 'users', getQuery: 'getMany' },
    );
  }

  async findByUsername(username: string) {
    return await this.userRepo.findOne({
      where: { username },
      relations: {
        permissions: true,
      },
    });
  }

  async createNewUser(createUserDto: CreateUserDto) {
    return await this.userRepo.create(createUserDto);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto | UpdateActiveUserDto,
  ) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async addStaff(
    addStaffDto: AddStaffDto
  ) {
    const createStaff: CreateUserDto = {
      is_active: true,
      shop_id: addStaffDto.shop_id,
      name: addStaffDto.name,
      username: addStaffDto.email,
      email: addStaffDto.email,
      password: encodePwd(addStaffDto.password),
      permissions: [
        {
          id: '4',
          name: 'staff',
          displayName: 'staff',
        },
      ],
    };
    return await this.create(createStaff);
  }

  repo() {
    return this.userRepo;
  }


  async softDelete(id: number) {
    return await this.userRepo.softDelete(id);
  }
}

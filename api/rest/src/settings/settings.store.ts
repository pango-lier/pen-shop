import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './entities/setting.entity';
import { UpdateSettingDto } from './dto/update-setting.dto';
@Injectable()
export class SettingsStore {
  constructor(
    @InjectRepository(Setting)
    private readonly baseRepo: Repository<Setting>,
  ) {}

  async create(createDto: CreateSettingDto) {
    const create = this.baseRepo.create(createDto);
    return await this.baseRepo.save(create);
  }

  async save(createDto: CreateSettingDto) {
    let create = await this.findByLanguage(createDto.language);
    if (!create) {
      create = this.baseRepo.create(createDto);
    }
    return await this.baseRepo.save({ ...create, ...createDto });
  }

  async update(id: number, updateDto: UpdateSettingDto) {
    const create = await this.baseRepo.findOne({ where: { id } });
    return await this.baseRepo.save({ ...create, ...updateDto });
  }

  async findByLanguage(language: string) {
    return await this.baseRepo.findOne({
      where: { language },
    });
  }

  repo() {
    return this.baseRepo;
  }
}

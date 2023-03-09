import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import settingsJson from '@db/settings.json';
import { SettingsStore } from './settings.store';

const settings = plainToClass(Setting, settingsJson);

@Injectable()
export class SettingsService {
  constructor(private readonly settingStore: SettingsStore) {}
  private settings: Setting = settings;

  save(settingDto: CreateSettingDto) {
    return this.settingStore.save(settingDto);
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return this.settingStore.update(id, updateSettingDto);
  }

  async findAll(language = 'en') {
    return await this.settingStore.findByLanguage(language);
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}

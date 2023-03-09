import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import SettingsJson from '../pickbazar/settings.json';

export default class CreateNewSettingSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    console.log('CreateNewSettingSeeder');
    const data = SettingsJson;
    const findData = await connect
      .getRepository('setting')
      .findOneBy({ id: data.id });
    if (findData) {
      await connect.getRepository('setting').save({ ...findData, ...data });
    } else {
      const newData = connect.getRepository('setting').create(data);
      console.log('create new Setting', newData);
      await connect.getRepository('setting').save(newData);
    }
  }
}

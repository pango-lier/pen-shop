import { Factory, Seeder, runSeeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import CreateNewUserSeeder from './user.ts/create-new-user.seeder';
import CreateNewTypeSeeder from './db/create-types.seeder';
import CreateNewSettingSeeder from './db/settings.seeder';

export default class Seeds implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    try {
      
      await runSeeder(CreateNewSettingSeeder);
      await runSeeder(CreateNewUserSeeder);
      await runSeeder(CreateNewTypeSeeder);
    } catch (error) {
      console.log(error);
    }
  }
}

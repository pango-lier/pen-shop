import { Factory, Seeder, runSeeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import CreateNewUserSeeder from './user.ts/create-new-user.seeder';

export default class Seeds implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    try {
      await runSeeder(CreateNewUserSeeder);
    } catch (error) {
      console.log(error);
    }
  }
}

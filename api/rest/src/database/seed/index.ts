import { Factory, Seeder, runSeeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class Seeds implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

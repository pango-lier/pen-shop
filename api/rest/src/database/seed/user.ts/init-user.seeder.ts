import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUserSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    console.log('create new user seeder');
  }
}

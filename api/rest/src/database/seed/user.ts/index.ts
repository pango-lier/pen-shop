import { Connection } from 'typeorm';
import { Factory, runSeeder, Seeder } from 'typeorm-seeding';
import CreateUserSeeder from './init-user.seeder';

export default class UserSeeder implements Seeder {
    public async run(factory: Factory, connect: Connection): Promise<any> {
        runSeeder(CreateUserSeeder);
    }
}

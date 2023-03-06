import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import typesJson from '../pickbazar/types.json';

export default class CreateNewTypeSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    console.log('CreateNewTypeSeeder');
    const data = typesJson;
    for (let i = 0; i < data.length; i++) {
      const findData = await connect
        .getRepository('type')
        .findOneBy({ id: data[i].id });
      console.log(data[i]);
      if (findData) {
        await connect.getRepository('type').save({ ...findData, ...data[i] });
      } else {
        const newData = connect.getRepository('type').create(data[i]);
        console.log('create new type', newData);
        await connect.getRepository('type').save(newData);
      }
    }
  }
}

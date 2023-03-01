import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { encodePwd } from '../../../common/utils/bcrypt';

const data = [
  {
    active: true,
    name: 'Binh Trong',
    username: 'kinhdoanh.bt@gmail.com',
    email: 'kinhdoanh.bt@gmail.com',
    password: encodePwd('hellokitty'),
    role_name: 'super-admin',
  },
];
export default class CreateNewUserSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    for (let i = 0; i < data.length; i++) {
      const user = await connect
        .getRepository('user')
        .findOneByOrFail({ email: data[i].email });
      if (user) {
        await connect.getRepository('user').save({ ...user, ...data[i] });
      } else {
        const newUser = connect.getRepository('user').create(data[i]);
        await connect.getRepository('user').save(newUser);
      }
    }
  }
}

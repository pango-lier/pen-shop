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
    role_name: 'super_admin',
    permissions: [
      {
        id: '1',
        name: 'super_admin',
        displayName: 'SuperAdmin',
      },
      {
        id: '2',
        name: 'admin',
        displayName: 'Admin',
      },
      {
        id: '3',
        name: 'store_owner',
        displayName: 'Store Owner',
      },
      {
        id: '4',
        name: 'staff',
        displayName: 'staff',
      },
      {
        id: '5',
        name: 'customer',
        displayName: 'Customer',
      },
    ],
  },
];
export default class CreateNewUserSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    console.log('CreateNewUserSeeder');
    for (let i = 0; i < data.length; i++) {
      const user = await connect
        .getRepository('user')
        .findOneBy({ email: data[i].email });
      console.log(data, user);
      if (user) {
        await connect.getRepository('user').save({ ...user, ...data[i] });
      } else {
        const newUser = connect.getRepository('user').create(data[i]);
        console.log('create new user', newUser);
        await connect.getRepository('user').save(newUser);
      }
    }
  }
}

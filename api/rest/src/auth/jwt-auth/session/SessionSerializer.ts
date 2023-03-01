import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { UsersStore } from '../../../users/users.store';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userStore: UsersStore) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('serializeUser');
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('deserializeUser');
    const userDb = await this.userStore.findById(user.id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}

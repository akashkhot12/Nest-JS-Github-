/* eslint-disable prettier/prettier */
import { User } from 'src/app/v1/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}

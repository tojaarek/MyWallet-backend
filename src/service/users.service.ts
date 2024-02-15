import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(newUser: Partial<User>): Promise<User> {
    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async findUser(key: keyof User, value: string): Promise<User | null> {
    const conditions: FindOptionsWhere<User> = { [key]: value };
    return await this.userRepository.findOneBy(conditions);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOne({ where: { id } });
  }
}

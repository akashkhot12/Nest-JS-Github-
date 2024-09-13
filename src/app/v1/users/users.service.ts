/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
      ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, type } = createUserDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ 
      username, 
      email, 
      password: hashedPassword, 
      type 
    });

    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppV1Module {}

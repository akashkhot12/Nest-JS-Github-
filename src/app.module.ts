/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppV1Module } from './app/v1/app.v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { User } from './app/v1/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_js',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
    AppV1Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

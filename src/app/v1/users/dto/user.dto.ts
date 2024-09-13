/* eslint-disable prettier/prettier */
export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  type: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

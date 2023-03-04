import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/users/entities/user.entity';
import { UserToken } from './UserToken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const jwtToken = this.jwtService.sign(user);

    return {
      token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new Error('User not found!');
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      throw new Error('Invalid password!');
    }

    user.password = '';
    return user.toObject();
  }
}

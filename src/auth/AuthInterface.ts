import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export interface AuthInterface extends Request {
  user: User;
}

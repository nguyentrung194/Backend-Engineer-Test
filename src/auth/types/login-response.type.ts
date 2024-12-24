import { User } from '../../users/entities/user.entity';

export type LoginResponseType = Readonly<{
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;

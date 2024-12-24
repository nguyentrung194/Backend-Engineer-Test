import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Status } from 'src/statuses/entities/status.entity';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      await this.usersService.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@example.com',
        username: 'admin',
        password: 'secret',
        role: {
          id: RoleEnum.admin,
        } as Role,
        status: {
          id: StatusEnum.active,
        } as Status,
      });
    }

    const countUser = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.user,
        },
      },
    });

    if (!countUser) {
      await this.usersService.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'john',
        password: 'secret',
        role: {
          id: RoleEnum.user,
        } as Role,
        status: {
          id: StatusEnum.active,
        } as Status,
      });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from 'src/blacklists/entities/blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistSeedService {
  constructor(
    @InjectRepository(Blacklist)
    private repository: Repository<Blacklist>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          regex_pattern: '*.example.com',
        }),
      );
    }
  }
}

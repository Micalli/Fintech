import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string) {
    const user = await this.usersRepository.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });
    return user;
  }
}
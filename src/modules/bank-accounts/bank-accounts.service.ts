import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}
  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;
    return await this.bankAccountsRepository.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const isOnwer = await this.bankAccountsRepository.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (isOnwer) {
      throw new NotFoundException('Conta do banco n encotrada.');
    }
    return;
  }

  remove(userId: string) {
    return;
  }
}

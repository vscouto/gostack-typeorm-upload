import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce((prev, transaction) => {
      return (
        prev + (transaction.type === 'income' ? Number(transaction.value) : 0)
      );
    }, 0);

    const outcome = transactions.reduce((prev, transaction) => {
      return (
        prev + (transaction.type === 'outcome' ? Number(transaction.value) : 0)
      );
    }, 0);
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;

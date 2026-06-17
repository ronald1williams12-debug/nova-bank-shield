import { faker } from '@faker-js/faker';

export type AccountType = 'Savings' | 'Current' | 'Fixed Deposit' | 'Business' | 'Investment';
export type KYCStatus = 'Pending' | 'Approved' | 'Rejected' | 'Not Submitted';
export type TransactionType = 'Credit' | 'Debit';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  status: TransactionStatus;
  category: string;
  recipientName?: string;
  recipientAccount?: string;
  bankName?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'User' | 'Admin';
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  kycStatus: KYCStatus;
  avatar: string;
  phone: string;
  address: string;
  createdAt: string;
  lastLogin: string;
  isFrozen: boolean;
}

export const generateMockData = () => {
  const users: User[] = [];
  const transactions: Transaction[] = [];

  // Generate Admin
  users.push({
    id: 'admin-1',
    firstName: 'Nova',
    lastName: 'Admin',
    email: 'admin@novatrust.com',
    role: 'Admin',
    accountNumber: '0000000000',
    accountType: 'Business',
    balance: 0,
    kycStatus: 'Approved',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    phone: '+1 (862) 450-8972',
    address: 'NovaTrust Headquarters, New York, USA',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isFrozen: false,
  });

  // Generate 1,000 customers
  for (let i = 0; i < 1000; i++) {
    const id = faker.string.uuid();
    const balance = faker.number.int({ min: 50000, max: 10000000 });
    const user: User = {
      id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      role: 'User',
      accountNumber: faker.finance.accountNumber(10),
      accountType: faker.helpers.arrayElement(['Savings', 'Current', 'Fixed Deposit', 'Business', 'Investment']),
      balance,
      kycStatus: faker.helpers.arrayElement(['Approved', 'Approved', 'Approved', 'Pending', 'Not Submitted']),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(true),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      lastLogin: faker.date.recent().toISOString(),
      isFrozen: faker.datatype.boolean(0.05), // 5% chance of being frozen
    };
    users.push(user);

    // Generate 100 transactions per user
    for (let j = 0; j < 100; j++) {
      const type = faker.helpers.arrayElement(['Credit', 'Debit']) as TransactionType;
      const amount = faker.number.int({ min: 1000, max: 500000 });
      transactions.push({
        id: faker.string.uuid(),
        userId: id,
        type,
        amount,
        description: faker.finance.transactionDescription(),
        date: faker.date.past({ years: 1 }).toISOString(),
        status: 'Completed',
        category: faker.helpers.arrayElement(['Transfer', 'Utility', 'Food', 'Salary', 'Investment', 'Shopping']),
        recipientName: type === 'Debit' ? faker.person.fullName() : undefined,
        recipientAccount: type === 'Debit' ? faker.finance.accountNumber(10) : undefined,
      });
    }
  }

  return { users, transactions };
};

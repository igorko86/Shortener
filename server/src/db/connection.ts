import { createConnection } from 'typeorm';

import { Company } from './entites/Company';
import { Token } from './entites/Token';

export const connectDB = async () => {
  const host = process.env.DB_HOST as unknown as string;
  const port = process.env.DB_PORT as unknown as number;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD as unknown as string;
  const database = process.env.DATABASE;

  try {
    await createConnection({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [Company, Token],
      synchronize: true,
    });
    console.log('Connected to postgres');
  } catch (error) {
    console.log(error);
    console.log('Failed to connect to postgres');
    throw error;
  }
};

import { createConnection } from 'typeorm';

import { Tutor } from './entites/Tutor';
import { Token } from './entites/Token';
import { LibraryCard } from './entites/LibraryCard';
import { Group } from './entites/Group';
import { Plan } from './entites/Plan';
import { PlanCard } from './entites/PlanCard';

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
      entities: [Tutor, Token, LibraryCard, Group, Plan, PlanCard],
      synchronize: true,
    });
    console.log('Connected to postgres');
  } catch (error) {
    console.log('Failed to connect to postgres');
    throw error;
  }
};

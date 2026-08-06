import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

// Loaded as string because enviornment variables return strings or undefined.
const connectionString = process.env.DATABASE_URL as string;
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

export default db;
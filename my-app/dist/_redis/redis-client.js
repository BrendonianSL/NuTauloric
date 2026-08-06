import { Redis } from 'ioredis';
export const redis = new Redis({
    username: 'default',
    password: process.env.REDIS_URL,
    host: 'resplendent-hair-hilarious-83220.db.redis.io',
    port: 12662,
});

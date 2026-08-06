import { Redis } from 'ioredis';

// Established a connection to the Redis Cache.
const redis = new Redis({
  username: 'default',
  password: process.env.REDIS_URL as string,
  host: 'resplendent-hair-hilarious-83220.db.redis.io',
  port: 12662,
});

export default redis;
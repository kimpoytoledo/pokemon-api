import { Injectable } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: RedisClient;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    });
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl: number = parseInt(process.env.CACHE_TTL || '0', 10)): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async cache<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl?: number,
    source: string = 'REDIS',
  ): Promise<{ data: T; source: string }> {
    const cachedData = await this.get(key);

    if (cachedData) {
      return { data: JSON.parse(cachedData), source };
    }

    const data = await fetchFn();
    await this.set(key, JSON.stringify(data), ttl);

    return { data, source: 'API' };
  }
}
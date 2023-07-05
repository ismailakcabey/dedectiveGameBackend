import { CACHE_MANAGER, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cache } from "cache-manager";

@Injectable()
export class RedisService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    async get(key: string) {
        try {
            const redisData = await this.cacheManager.get(key)
            return redisData
        } catch (e) {
            Logger.error(e)
        }

    }

    async set(key: string, data: any, ttl: number) {
        try {
            const redisData = await this.cacheManager.set(key, data, ttl)
            return redisData
        } catch (e) {
            Logger.error(e)
        }
    }

    async del(key: string) {
        try {
            const redisData = await this.cacheManager.del(key)
            return redisData
        } catch (e) {
            Logger.error(e)
        }
    }

}
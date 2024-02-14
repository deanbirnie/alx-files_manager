import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (err) => {
      console.error(`Redis client cannot connect to the server: ${err.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.getAsync(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, value, duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

export default new RedisClient();

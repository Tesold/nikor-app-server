import { createClient } from 'redis';

(async () => {
  const client = createClient();

  client.on('error', (err: any) => (console.log('Redis Client Error'), err));

  await client.connect();
})();

// const redis = require('redis');
// const redisClient = redis.createClient();

// redisClient.on('error', (err) => {
//   console.error('Redis error:', err);
// });

// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });

// redisClient.on('ready', () => {
//   console.log('Redis client ready');
// });

// redisClient.on('end', () => {
//   console.log('Redis client disconnected');
// });

// // Use the redisClient instance in your controllers and middleware

// process.on('SIGINT', () => {
//   redisClient.quit();
//   process.exit();
// });
const kue = require('kue');

//const queue = kue.createQueue();
var queue = kue.createQueue({
    prefix: 'queue',
    redis: {
      port: 18098,
      host: 'redis-18098.c52.us-east-1-4.ec2.cloud.redislabs.com',
      auth: 'D0Nkmf3O0paT1w2gwBRG4lcpTKMv8ogH',
    //   db: 3, // if provided select a non-default redis db
    //   options: {
    //     // see https://github.com/mranney/node_redis#rediscreateclient
    //   }
    }
  });

module.exports =queue;
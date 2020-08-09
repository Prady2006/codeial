const kue = require('kue');
const queue = kue.createQueue({
    redis: {
        port: 12232 ,
        host: 'redis-12232.c12.us-east-1-4.ec2.cloud.redislabs.com',
        auth: '0pwbUrE1e24InTnU6fScCL1DTUreIm7M' 
    }
});
module.exports = queue ;
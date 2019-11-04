/**
 * @desc global middleware config
 */
//const mongoose = require('mongoose')
//const Stores = require('koa2-ratelimit').Stores

module.exports = {
    /**
     * mongoose setting
     */
    db: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    /**
     * koa-session setting
     */
    session: {
        key: 'JSD._sess', //cookie key (default is koa:sess)
        maxAge: 3600000,    // maxAge in ms (default is 1 days)
        overwrite: true,  //overwrite the session value(default true)
        httpOnly: true,   //only server can access cookie (httpOnly or not )(default true)
        signed: true,     //default signed true
        rolling: false,   //set cookie in every request，it will reset cookie expired（default：false）
        renew: false,     //(boolean) renew session when session is nearly expired,
    },
    /**
     * RateLimit Global defalut setting
     * https://www.npmjs.com/package/koa2-ratelimit
     * @desc ***Tou can create multiple instances to apply different rules to different routes***
     */
    limiter: {
        interval: { min: 15 }, // 15 minutes = 15*60*1000
        delayAfter: 0,//max number of connections during interval before starting to delay responses. Defaults to 1. Set to 0 to disable delaying.
        timeWait: 0,//how long to delay the response, multiplied by (number of recent hits - delayAfter). Defaults to 1000 (1 second). Set to 0 to disable delaying.
        max: 200, // limit each IP to 100 requests per interval
        statusCode: 429,//HTTP status code returned when max is exceeded. Defaults to 429.
        message: 'Too many requests, please try again later !!',
        whitelist: [],//Array of whitelisted IPs to not be rate limited.
        // store: new Stores.Mongodb(mongoose.connection, {
        //     collectionName: 'ratelimits', // table to manage the middleware
        //     collectionAbuseName: 'ratelimitsabuses', // table to store the history of abuses in.
        // })    
    },    
    /**
     * helmet CSP security module 
     * @doc https://helmetjs.github.io/docs/csp/ 
     * @desc CSP模塊設置了Content-Security-Policy標頭，可以幫助防止惡意注入JavaScript，CSS，插件等
     * 主要設置CSP broser httpHeader 的防護策略
     */
    CSP: {
        directives: {
            //defaultSrc: ["'self'"],//設為僅允許本身 domain            
            scriptSrc: ["'self'"],//設為僅允許本身 domain 及 行內JS inline script
            imgSrc: ["'self'"],
            frameSrc: ["'none'"],//不載入任何 iframe src
            //sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
            reportUri: '/api/common/report-violation', //如果有違規,自動POST 到/report-violation接口
            objectSrc: ["'none'"],
        },        
        browserSniff: false,
        disableAndroid: true,//Old Android browsers can be very buggy. This is false by default.
    },
}
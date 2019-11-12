const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const CONFIG = require('./config/default')
/**
 * middlewares*/
const logger = require('koa-logger')// log requests
const json = require('koa-json')//json pretty
const bodyParser = require('koa-bodyparser')//post parse tools
const mongoose = require('mongoose')
const Router = require('koa-router')
const passport = require('koa-passport')
const session = require('koa-session')
const RateLimit = require('koa2-ratelimit').RateLimit
const helmet = require("koa-helmet")//security headers

/**
 * router middlewares*/
const modelName = require('./middleware/modelName')
const varGlobal = require('./middleware/varGlobal')

const app = new Koa()
const router = new Router()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host = process.env.HOST || '127.0.0.1',
        port = process.env.PORT || 3000
    } = nuxt.options.server

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }    

    app.use((ctx) => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })    

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

async function initialEnv() {
    /*env file exsisted */
    if(!process.env.DB_URL) {
        throw new Error('.env file is exsisted ?')
    } else {
        consola.ready({
            message: 'ENV File is Ready!',
            badge: true
        })
    }
    /*Connect to mongodb*/
    mongoose.connect(process.env.DB_URL, CONFIG.db)
    .then(() => {
        consola.ready({
            message: 'MongoDB Connected Success!',
            badge: true
        })
    })
    .catch(err => consola.error(err.message));
}

start()
initialEnv()

app.keys = [process.env.SESSIONKEY];
/** global middleware */
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(session(CONFIG.session, app));
app.use(RateLimit.middleware(CONFIG.limiter));
/** helmet security*/
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.0.15' }))//fake X-Powered-By
//app.use(helmet.contentSecurityPolicy(CONFIG.CSP))//CSP module
/** set passport*/
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport')(passport);
/** set koa-router*/
app.use(router.routes()).use(router.allowedMethods())
/** set G object in global variable */ 
router.use(varGlobal())

/** common API */
router.use('/api/admin/rest/:resource', passport.authenticate('jwt', { session: false }), modelName(), require('./routes/admin'))//CRUD通用接口
router.use('/api/admin/getSelectList/:resource', passport.authenticate('jwt', { session: false }), modelName(), require('./routes/admin/getSelectList'))//取得跨集合 關聯數據通用接口

/** public API */
router.use('/api/common', require('./routes/common'))// common includ [svg-captcha api]
router.use('/api/admin/managers', require('./routes/admin/managers'))// managers api

/** private API */
router.use('/api/admin/brands', passport.authenticate('jwt', { session: false }), require('./routes/admin/brands'))// brands api



//upload image接口 
//router.use('/api/admin/upload', require('./routes/admin/upload'))
//download DataList接口 
//router.use('/api/admin/download', require('./routes/admin/download'))




/*** Error Listen ***/
app.on('error', (err, ctx) => {
    consola.error(err.message)
    consola.error(ctx.request.ip)
    console.log(err);
});
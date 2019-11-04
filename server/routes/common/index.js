const Router = require('koa-router')
const router = new Router()
const svgCaptcha = require('../../utils/svgCaptcha')
const consola = require('consola')
/**
 * @desc svg-captcha 驗證碼接口
 * @point **session can not use middleware to send something, that is very important**
 */
router.get('/captcha', async (ctx) => {
    const captcha = await svgCaptcha()
    
    ctx.response.type = 'image/svg+xml'
    ctx.session.captchaCode = captcha.text
    //console.log('/captcha code:',ctx.session.captchaCode)
    ctx.body = captcha.data
})

/**
 * @desc CSP security report API
 * logger Violation
 */
router.post('/report-violation', async (ctx) => {
    if(ctx.request.body) {
        console.log('CSP Violation: ', ctx.request.body)
    } else {
        console.log('CSP Violation: No data received!')
    }
})

module.exports = router.routes();
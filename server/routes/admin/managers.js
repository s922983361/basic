/**
 * @desc CRUD通用接口
 */
const Router = require('koa-router')
const router = new Router()
const Manager = require('../../model/Manager')
const RoleAccess = require('../../model/RoleAccess')
const Access = require('../../model/Access')
const tools = require('../../utils/tools')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')
const xss = require('xss')
const { _CODE, CTXBODY } = require('../../statusCode')

router.post('/register', async (ctx) => {
    /**
     * @desc 註冊接口
     */
    const { email, password, name } = ctx.request.body    
    // ctx throw error HTTP ERROR
    tools.isEmpty(email) && ctx.throw(400, 'Register Without--Eamil Validation')
    tools.isEmpty(password) && ctx.throw(400, 'Register Without--Password Validation')

    if(tools.isEmpty(name)) {
        ctx.throw(400, 'Register Without--Name Validation')
    } else {
        ctx.request.body.name = xss(ctx.request.body.name)
    }

    try {
        const res = await Manager.find({email})

        if(!tools.isEmpty(res)) { 
            const CODE = _CODE.REGISTER_EMAIL_IS_EXSISTE
            ctx.body = CTXBODY(CODE)
        } else {
            //www.gravatar.com/avatar/ea4721fbdf5b531dada7e1839b7a192a?s=200&r=pg&d=mm"
            //returns http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pgx&d=mm
            const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
            ctx.request.body.avatar = avatar
            //ecrypt password
            ctx.request.body.password = await tools.encrypt(ctx.request.body)
            //save data
            const model = await Manager.create(ctx.request.body)
            //send message to client
            const CODE = _CODE.RIGISTER_SUCCESS
            ctx.body = CTXBODY(CODE)
        }        
    }
    catch(err) {
        //ctx.status = err.statusCode || err.status || 500;        
        const CODE = _CODE.REGISTER_SEVER_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.post('/login', async (ctx) => {
    /**
     * @desc 管理員登入
     * @point **session can not use middleware to send something, that is very important**
     * $route POST api/admin/manager/login
     * @ access public*/

    const { email, password, captcha } = ctx.request.body   

    tools.isEmpty(email) && ctx.throw(400, 'Login Without--Eamil Validation')
    tools.isEmpty(password) && ctx.throw(400, 'Login Without--Password Validation')
    tools.isEmpty(captcha) && ctx.throw(400, 'Login Without--Captcah Validation')
    //session is exsist?
    if(tools.isEmpty(ctx.session.captchaCode)) {
        const CODE = _CODE.LOGIN_SESSION_NOTEXSIST
        return ctx.body = CTXBODY(CODE)
    }    
    //captcha Validation
    let captchaMatch = false
    if(ctx.session.captchaCode.toLocaleUpperCase() == captcha.toLocaleUpperCase()) {
        captchaMatch = true
    } else {
        const CODE = _CODE.CAPTCHA_ERROR
        return ctx.body = CTXBODY(CODE)
    }

    try {
        if(captchaMatch) {
            const result = await Manager.find({email})
            const USER = result[0]

            if(result.length == 0) {            
                const CODE = _CODE.LOGIN_MANAGER_NOTEXSIST
                return ctx.body = CTXBODY(CODE)
            } else {
                //password valid
                const isMatch = await tools.decrypt(password, USER.password)
                //use USER.role_id to fetch User Access
                const res = await RoleAccess.find({'role_id': USER.role_id})
                
                if(isMatch) {
                    //the data detail in token
                    const payload = {
                        id: USER.id,
                        name: USER.name,
                        avatar: USER.avatar
                    }                
                    //Use JWT generate Token
                    const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: 3600 })
                    const CODE = _CODE.LOGIN_SUCCESS
                    const obj = CTXBODY(CODE)
                    obj['token'] = "Bearer " + token//"Bearer 是自動配置的也是必須的**注意:**要一個空格

                    if(!tools.isEmpty(res)){
                        //ACCESS is Obj of Access Model
                        const ACCESS = res[0]
                        let accessArray = []
                        //ACCESS.access_id is Array storeed 'id' of Access Model
                        //Use Array Iterator (for.. of..), because Array.foeEach API is not an async function
                        for(id of ACCESS.access_id) {
                            const result = await Access.find({'_id': id})
                            accessArray.push(result[0].url)
                        }
                        obj['name'] = USER.name
                        obj['avatar'] = USER.avatar
                        obj['is_super'] = USER.is_super
                        obj['access'] = accessArray
                    }

                    return ctx.body = obj        
                } else {                
                    const CODE = _CODE.LOGIN_PASSWORD_INCORRENT
                    return ctx.body = CTXBODY(CODE)
                }
            }
        }        
    }
    catch(err) {
        //ctx.status = err.statusCode || err.status || 500;
        const CODE = _CODE.LOGIN_SEVER_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }    
})
router.get('/currentUser', passport.authenticate('jwt', { session: false }), async (ctx) => {
    /**
     * @desc 驗證token後才能訪問
     * 一定要使用user,因為為ctx.state裡的標準鍵值
     * 返回當前管理者資訊
     * access private*/

    //Use USE.role_id to find RoleAccess    
    try {
        const res = await RoleAccess.find({'role_id': ctx.state.user.role_id})
        let accessArray = []
        //ACCESS is Obj of Access Model
        const ACCESS = res[0] 
        //ACCESS.access_id is Array storeed 'id' of Access Model
        //Use Array Iterator (for.. of..), because Array.foeEach API is not an async function
        for(id of ACCESS.access_id) {
            const result = await Access.find({'_id': id})
            accessArray.push(result[0].url)
        }
        // Use Promise & Array.map function to async push All "**data Obj**" in accessArray
        // accessArray = await Promise.all(ACCESS.access_id.map((id) => {
        //     const result = Access.find({'_id': id})        //     
        // }))

        ctx.body = {        
            id: ctx.state.user._id,
            name: ctx.state.user.name,
            email: ctx.state.user.email,
            avatar: ctx.state.user.avatar,
            is_super: ctx.state.user.is_super,
            access: accessArray
        }
    }
    catch(err) {
        console.log(err)
    }    
})

module.exports = router.routes();
/**
 * @desc CRUD通用接口
 */
const Router = require('koa-router')
const router = new Router()
const { _CODE, CTXBODY } = require('../../statusCode')

router.get('/', async (ctx) => {
    /**
     * @Private
     * @desc 取得關聯數據 供select 列表使用
     * return Array
     */
    let queryOptions = {}
    if(ctx.state.Model.modelName === 'Access'){
        queryOptions.module_id = "0"
    }

    try {
        let selectList = await ctx.state.Model.find(queryOptions)        
        ctx.body = {            
            data: selectList
        }
    }
    catch(err) {
        const CODE = _CODE.COMMOM__GETSELECTLIST_ERROR
        ctx.body = CTXBODY(CODE)
    } 
})

module.exports = router.routes();
/**
 * @desc brand 品牌操作接口
 */
const Router = require('koa-router')
const router = new Router()
const Brand = require('../../model/Brand')
const Manager = require('../../model/Manager')
const tools = require('../../utils/tools')
const passport = require('koa-passport')
const xss = require('xss')
const { _CODE, CTXBODY } = require('../../statusCode')

router.post('/', async (ctx) => {
    /**
     * @desc 新增品牌
     */
    const { manager_id, logoUrl } = ctx.request.body 
    ctx.request.body.name = xss(ctx.request.body.name)
    
    tools.isEmpty(ctx.request.body.name) && ctx.throw(400, 'Add Brand Without-- Brand Name')
    tools.isEmpty(manager_id) && ctx.throw(400, 'Add Brand Without-- manager_id')

    try {
        //this brand is used 
        const res = await Brand.find({ name : ctx.request.body.name })
        if(!tools.isEmpty(res)) { 
            const CODE = _CODE.ADD_BRAND_IS_EXSISTE
            ctx.body = CTXBODY(CODE)
        } else { 
            //save data to Brand
            const model = await Brand.create({
                name: ctx.request.body.name,
                manager_id,
                logoUrl
            })
            //set field "brand_id" in manager schema
            const brand_id =[]
            const result = await Brand.find({ manager_id })
            result.forEach(item => {
                brand_id.push(item._id)
            })
            //connect to manager update time
            const d = new Date()
            let update_date = d.getTime()
            await Manager.findByIdAndUpdate(
                manager_id, 
                { update_date, brand_id }, 
                { runValidators: true }
            )
            //send message to client
            const CODE = _CODE.ADD_BRAND_SUCCESS
            ctx.body = CTXBODY(CODE)
        } 
    }
    catch(err) {
        const CODE = _CODE.ADD_BRAND_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.get('/:id/:pageIndex/:pageSize', async (ctx) => {
    /**
     * @desc fetch data in table list API
     * @ access private*/
    const pageIndex = parseInt(ctx.params.pageIndex)
    const pageSize = parseInt(ctx.params.pageSize)
    const skipNum = (pageIndex - 1) * pageSize;//跳過的數量

    const queryOptions = {}
    try {        
        const items = await Brand.find({ manager_id: ctx.params.id }).skip(skipNum).setOptions(queryOptions).limit(pageSize)
        
        ctx.status = 200
        ctx.body = {            
            data: items,
            total: items.length
        }
    }
    catch(err) {
        const CODE = _CODE.BRANDS_FETCH_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.put('/:id', async (ctx) => {
    /**
     * @desc Update One data API
     * @ access private*/
    const { manager_id, logoUrl } = ctx.request.body 
    ctx.request.body.name = xss(ctx.request.body.name)
    
    tools.isEmpty(ctx.request.body.name) && ctx.throw(400, 'Add Brand Without-- Brand Name')
    tools.isEmpty(manager_id) && ctx.throw(400, 'Add Brand Without-- manager_id')   
    
    try {
        //fetch Data Array that _id not equal ctx.params.id
        const res = await Brand.find({ name : ctx.request.body.name, _id : { $ne: ctx.params.id }})
        //this brand is used
        if(!tools.isEmpty(res)) { 
            const CODE = _CODE.ADD_BRAND_IS_EXSISTE
            ctx.body = CTXBODY(CODE)
        } else {
            const d = new Date()
            ctx.request.body.update_date = d.getTime()
            await Brand.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true })
            const CODE = _CODE.BRAND_UPDATE_SUCCESS
            ctx.body = CTXBODY(CODE)
        }
    }
    catch(err) {
        const CODE = _CODE.BRAND_UPDATE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.delete('/:id/:manager_id', async (ctx) => {
    /**
     * @desc Delete One data API
     * @ access private*/ 
    try {
        await Brand.findByIdAndDelete(ctx.params.id)

        //set field "brand_id" in manager schema
        const brand_id =[]
        const result = await Brand.find({ manager_id : ctx.params.manager_id })
        result.forEach(item => {
            brand_id.push(item._id)
        })
        //connect to manager update time
        const d = new Date()
        let update_date = d.getTime()
        await Manager.findByIdAndUpdate(
            ctx.params.manager_id, 
            { update_date, brand_id }, 
            { runValidators: true }
        )
        const CODE = _CODE.BRAND_DELETE_SUCCESS
        ctx.body = CTXBODY(CODE)
    }
    catch(err) {
        const CODE = _CODE.BRAND_DELETE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

module.exports = router.routes();
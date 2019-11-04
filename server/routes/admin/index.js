/**
 * @desc CRUD通用接口
 */
const Router = require('koa-router')
const router = new Router()
const { _CODE, CTXBODY } = require('../../statusCode')

router.post('/', async (ctx) => {
    /**
     * @desc add data API
     * @ access private*/
    if(ctx.state.Model.modelName === 'RoleAccess') {
        await ctx.state.Model.deleteMany({ "role_id": ctx.request.body.role_id })
    }
    try {
        const model = await ctx.state.Model.create(ctx.request.body)
        const CODE = _CODE.COMMOM_CRUD_ADD_SUCCESS
        ctx.body = CTXBODY(CODE)
    }
    catch(err) {
        const CODE = _CODE.COMMOM_CRUD_ADD_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.get('/:pageIndex/:pageSize', async (ctx) => {
    /**
     * @desc fetch data in table list API
     * @ access private*/
    const pageIndex = parseInt(ctx.params.pageIndex)
    const pageSize = parseInt(ctx.params.pageSize)
    const skipNum = (pageIndex - 1) * pageSize;//跳過的數量

    const queryOptions = {}
    // mogoose populate DATA https://blog.csdn.net/elliott_yoho/article/details/53537147    
    if(ctx.state.Model.modelName === 'Manager') {
        queryOptions.populate = 'role'
    }
    try {
        const totalItems = await ctx.state.Model.estimatedDocumentCount()//計算該集合內總數量
        const items = await ctx.state.Model.find().skip(skipNum).setOptions(queryOptions).limit(pageSize)

        ctx.status = 200
        ctx.body = {            
            data: items,
            total: totalItems
        }
    }
    catch(err) {
        const CODE = _CODE.COMMOM_CRUD_FETCH_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})


router.get('/:id', async (ctx) => {
    /**
     * @desc fetch One data to Update API
     * @ access private*/
    try {
        const items = await ctx.state.Model.findById(ctx.params.id)
        ctx.status = 200
        ctx.body = {            
            data: items
        }
    }
    catch(err) {
        const CODE = _CODE.COMMOM_CRUD_FETCHONE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.put('/:id', async (ctx) => {
    /**
     * @desc Update One data API
     * @ access private*/    
    try {
        const d = new Date()
        ctx.request.body.update_date = d.getTime()
        await ctx.state.Model.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true })
        const CODE = _CODE.COMMOM_CRUD_UPDATE_SUCCESS
        ctx.body = CTXBODY(CODE)
    }
    catch(err) {
        const CODE = _CODE.COMMOM_CRUD_UPDATE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.delete('/:id', async (ctx) => {
    /**
     * @desc Delete One data API
     * @ access private*/ 
    try {
        await ctx.state.Model.findByIdAndDelete(ctx.params.id)
        const CODE = _CODE.COMMOM_CRUD_DELETE_SUCCESS
        ctx.body = CTXBODY(CODE)
    }
    catch(err) {
        const CODE = _CODE.COMMOM_CRUD_DELETE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

module.exports = router.routes();
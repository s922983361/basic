/**
 * @desc brand 品牌操作接口
 */
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const Brand = require('../../model/Brand')
const Manager = require('../../model/Manager')
const tools = require('../../utils/tools')
const xss = require('xss')
const { _CODE, CTXBODY } = require('../../statusCode')

router.post('/', async (ctx) => {
    /**
     * @desc Specific Manager add new Brand and manager connection update  
     * 1.necessary {ctx.request.body.name, manager_id, logoUrl}
     * 2.has this brand be used ? 
     * 3.save data to Brand data connection
     * 4.set field "brand_id" in manager schema 
     * 5.update manager data connection
     */
    const { manager_id, imageUrl } = ctx.request.body 
    ctx.request.body.name = xss(ctx.request.body.name)
    //1.necessary {ctx.request.body.name, manager_id, logoUrl}
    tools.isEmpty(ctx.request.body.name) && ctx.throw(400, 'Add Brand Without-- Brand Name')
    tools.isEmpty(manager_id) && ctx.throw(400, 'Add Brand Without-- manager_id')
    tools.isEmpty(imageUrl) && ctx.throw(400, 'Add Brand Without-- imageUrl')

    try {
        //2.has this brand be used ?
        const res = await Brand.find({ name : ctx.request.body.name })
        if(!tools.isEmpty(res)) { 
            const CODE = _CODE.ADD_BRAND_IS_EXSISTE
            ctx.body = CTXBODY(CODE)
        } else { 
            //3.save data to Brand data connection
            const model = await Brand.create({
                name: ctx.request.body.name,
                manager_id,
                imageUrl
            })
            //4.set field "brand_id" in manager schema
            const brand_id =[]
            const result = await Brand.find({ manager_id })
            result.forEach(item => {
                brand_id.push(item._id)
            })
            //5.update manager data connection
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
     * @ access private
     * @param {*} id this is Specific manager_id
     * @param {*} pageIndex default first one page
     * @param {*} pageSize show count in one page
     */
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

router.put('/:id/:fileName', async (ctx) => {
    /**
     * @desc Update One data API
     * @ access private
     * @param {*} id this is brand id
     * @param {*} fileName fileName of logoUrl has be substring()
     * 1.xss filter inputData of client 
     * 2.necessary {ctx.request.body.name, manager_id} && logoUrl is not necessary
     * 3.fetch Data Array that _id not equal ctx.params.id
     * 4.has this brand be used?
     * 5.fetch old image before update new brand
     * 6.upadte new brand
     * 7.Delete old image of this Brand if upadte new brand Successfully
     */
    const { manager_id } = ctx.request.body
    //1.xss filter inputData of client
    ctx.request.body.name = xss(ctx.request.body.name)
    //2.necessary {ctx.request.body.name, manager_id}
    tools.isEmpty(ctx.request.body.name) && ctx.throw(400, 'Add Brand Without-- Brand Name')
    tools.isEmpty(manager_id) && ctx.throw(400, 'Add Brand Without-- manager_id')   
    
    try {
        //3.fetch Data Array that _id not equal ctx.params.id
        const res = await Brand.find({ name : ctx.request.body.name, _id : { $ne: ctx.params.id }})        
        //4.has this brand be used?
        if(!tools.isEmpty(res)) { 
            const CODE = _CODE.ADD_BRAND_IS_EXSISTE
            ctx.body = CTXBODY(CODE)
            return
        }
        //5.fetch old image before update new brand
        const { imageUrl } = await Brand.findById(ctx.params.id)
        //6.upadte new brand
        const d = new Date()
        ctx.request.body.update_date = d.getTime()                
        await Brand.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true })

        //7.Delete old image of this Brand if upadte new brand Successfully  
        if(imageUrl !== ctx.request.body.imageUrl){
            const FileName = ctx.params.fileName
            const destPath = `${__dirname}/../../../static/uploads/brandLogo/${FileName}`
            //destPath should existe
            tools.isEmpty(destPath) && ctx.throw(400, 'Delete BrandLogo Without-- LogoFileName')
            //async delete brandLogo Image
            fs.unlink(destPath, (err) => {
                if (err) throw err
            })
        }
        const CODE = _CODE.BRAND_UPDATE_SUCCESS
        ctx.body = CTXBODY(CODE)
    }
    catch(err) {
        const CODE = _CODE.BRAND_UPDATE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

router.delete('/:id/:manager_id/:fileName', async (ctx) => {
    /**
     * @desc Delete One data API
     * @ access private*/

    // delete image of delete data
    const FileName = ctx.params.fileName
    // the dest path to brandLogo Image
    const destPath = `${__dirname}/../../../static/uploads/brandLogo/${FileName}`
    //destPath should existe
    tools.isEmpty(destPath) && ctx.throw(400, 'Delete BrandLogo Without-- LogoFileName')
    try {
        await Brand.findByIdAndDelete(ctx.params.id)
        //async delete brandLogo Image
        fs.unlink(destPath, (err) => {
            if (err) throw err
        })
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
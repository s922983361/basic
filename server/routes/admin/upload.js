/**
 * @desc 上傳圖片接口
 */
const Router = require('koa-router')
const router = new Router()
const multer = require('koa-multer')
const upload = multer({ dest: __dirname + '/../../../static/uploads' })

router.post('/', upload.single('file'), async (ctx) => {
    //upload.single('file')file來自client的formdata
    //upload.single('file') ,會在ctx.req上添加file字段
    const file = ctx.req.file
    //nuxt static/uploads
    file.url = `http://localhost:3000/uploads/${file.filename}`
    ctx.body = {
        file
    }    
})

module.exports = router.routes();
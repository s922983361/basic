/**
 * @desc upload file API
 * **make sure the folder "@/static/uploads" exist its very important!**
 * 1. store file in custom folder name
 * 2. if not exist custom folder you want that will be created automatically
 * 3. auto delete the origin file in uploads folder
 */
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const multer = require('koa-multer')
const upload = multer({ dest: __dirname + '/../../../static/uploads' })
const tools = require('../../utils/tools')
const { _CODE, CTXBODY } = require('../../statusCode')

router.post('/', upload.single('file'), async (ctx) => {

    tools.isEmpty(ctx.req.file) && ctx.throw(400, 'Upload Without-- File')
    tools.isEmpty(ctx.req.body.uploadFile) && ctx.throw(400, 'Upload Without-- UploadFile')
    // use upload.single('file')  => formdata.file of client is setted ctx.req.file
    const file = ctx.req.file
    //the other data field will be setted into ctx.req.body
    const uploadFile = ctx.req.body.uploadFile
    // the sourceFile path we want to move
    const sourceFile = `${__dirname}/../../../static/uploads/${file.filename}` 
    // the dest path to store sourceFile
    const destPath = `${__dirname}/../../../static/uploads/${uploadFile}/${file.filename}`
    // the dir we set the name we wnat 
    const destPathDir = `${__dirname}/../../../static/uploads/${uploadFile}`
    // mkdir if not exist dir 
    !fs.existsSync(destPathDir) && fs.mkdirSync(destPathDir)

    try {        
        //async move file        
        fs.rename(sourceFile, destPath, (err) => {
            if (err) throw err
        })
        //nuxt static/uploads
        file.url = `http://localhost:3000/uploads/${uploadFile}/${file.filename}`
        const CODE = _CODE.UPLOAD_FILE_SUCCESS
        const obj = CTXBODY(CODE)        
        obj['file'] = file        
        return ctx.body = obj  
    }
    catch(err) {
        const CODE = _CODE.UPLOAD_FILE_ERROR
        ctx.body = CTXBODY(CODE)
        ctx.app.emit('error', err, ctx);
    }
})

module.exports = router.routes();
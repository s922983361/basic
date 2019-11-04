/**
 * @desc 下載數據接口
 */
const Router = require('koa-router')
const router = new Router()
const officegen = require('officegen')
const { PassThrough } = require('stream');
const fs = require('fs')


router.post('/', async (ctx) => {
    
})

module.exports = router.routes();

// const todos = ctx.request.body.downData//Data resourse 
//     const titles = ctx.request.body.titles //ExcelFile Head
//     const heads = ctx.request.body.lables //ExcelFile Chinaese Head
//     const status = ctx.request.body.statusArray //Data status 
//     let data = [] //ExcelFile content

//     data.push(heads)
//     todos.forEach( todo => {
//         let tmp = []
//         // for(let i = 0; i < titles.lengh; i++) {
//         //     tmp[i] = todo[titles[i]]            
//         // }
//         tmp[0] = todo.name
//         tmp[1] = todo.email
//         tmp[2] = todo.text
//         tmp[3] = todo.status
//         data.push(tmp)
//     });
    
//     //console.log(data)
//     // Create an empty Excel object:    
//     let xlsx = officegen('xlsx')
//     let sheet = xlsx.makeNewSheet()
//     sheet.name = 'List Excel'
//     sheet.data = data    
//     //下載至本機端
    
//     const out = fs.createWriteStream('example.xlsx').pipe()
//     out.on('error', function(err) {
//         console.log(err)
//     })
//     xlsx.generate(out)
//     //下載至客戶端
//     // const out = new PassThrough();    
//     // xlsx.generate(out).pipe(ctx.body)
//     ctx.body = out
//     console.log(out)
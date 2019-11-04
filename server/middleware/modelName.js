const inflection = require('inflection')//字串的單數改複數 大寫改小寫
const consola = require('consola')

module.exports = () => {
    return async (ctx, next) => {
        try {
            const modelName = inflection.classify(ctx.params.resource)
            ctx.state.Model = require(`../model/${modelName}`)
            await next()
        }
        catch(err) {
            consola.error(err)
        }        
    }
}
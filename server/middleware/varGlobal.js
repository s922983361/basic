module.exports = () => {    
    return async (ctx, next) => {
        ctx.state.G = {
            //write some default variale 
        }
        await next()
    }
}
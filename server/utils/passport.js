/**
 * 安裝passport-jwt
 * @desc 支持passport驗證jsonweb-tokene工具,沒有會話的情況下保護RESTful端點
 * 給所有的manager passport 使用api接口
 * @JwtStrategy 規則驗證對象
 * @ExtractJwt 取得token的類
 */
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Manager = require('../model/Manager')
const opts = {}
//創建一個新的提取器，使用方案'bearer'在授權頭中查找JWT
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//opts.secretOrKey 是JwtStrategy{}的key名是必要的
opts.secretOrKey = process.env.TOKEN_KEY;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payLoad, done) => {
        //console.log(jwt_payLoad)        
        const user = await Manager.findById(jwt_payLoad.id)
        
        if(user) {                      
            return done(null, user)// 返回ctx.state.user            
        } else {
            console.log('user not exsist')
            return done(null, false); 
        }
    }))
}
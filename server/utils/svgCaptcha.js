const svgCaptcha = require('svg-captcha')

module.exports = async () => { 
    const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 50,
        ignoreChars: '0oO1ilI',//排除這些字
        width: 100,
        height: 50,
        background: '#91f793'
    })    
    return captcha
}
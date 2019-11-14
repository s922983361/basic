const bcrypt = require('bcrypt')

const tools = {
    /**
     * @desc 使用bcryptjs 加密密碼
     * bcrypt.hash() => 異步函數
     * return hash string
     */
    
    encrypt: async (item) => {
        const password = item.password
        const saltRounds = 10;
        
        const hashPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) reject(err)
                resolve(hash)
            })
        })
        return hashPassword 
    },
    /**
     * @desc 使用bcryptjs 解密
     * return boolen
     */
    decrypt: async (pwd, db_pwd) => { 

        const res = await bcrypt.compare(pwd, db_pwd);
        return res
    },
    /**
     * @desc 判斷是否為空
     * return boolen
     */
    isEmpty:(value) => {
        return (
            value == undefined || 
            value === null || 
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
    },
}

module.exports = tools;
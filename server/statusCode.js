
const _MSG = {
    10200 : '10200 Success To Register Manager !!',
    10204 : '10204 This Email Exsit !!',
    10500: '10500 Server ERROR !!',

    11200: '11200 Success To Login Manager !!',
    11400: '11400 Password Or Email Error !!',
    11404: '11404 This Manager Does Not Exsist !!',
    11405: '11405 Session OR Cookie is Expired',
    11500: '11500 Server ERROR !!',

    12400: '12400 Captcha Is Incorrect!',

    // 13200: '13200 Success To ADD RoleAccesses !!',
    // 13500: '13500 Server ERROR !!',
    // 14500: '14500 Server ERROR !!',

    20200: '20200 Store Data in Database Success!!',
    20500: '20500 Fail to Store Data, Server ERROR !!',
    21500: '21500 Fail to Fetch Data, Server ERROR !!',
    22500: '22500 Fail to Fetch One Data, Server ERROR !!',
    23200: '23200 Update Data in Database Success!!',
    23500: '23500 Fail to Update Data, Server ERROR !!',
    24200: '24200 Delete Data in Database Success!!',
    24500: '24500 Fail to Delete Data, Server ERROR !!',
    25500: '25500 Fail to fetch SELECT Data, Server ERROR !!',
} 
const _TITLE = {    
    10200 : '註冊成功!,請使用新帳號密碼登入!!',
    10204 : '該信箱帳號已經存在,請使用其他可收到信件之信箱',
    10500:  '服務器發生錯誤,請聯絡管理人員',

    11200: '登入成功',
    11400: '帳號或密碼錯誤',
    11404: '帳號不存在',
    11405: 'Cookie過期請重新整理頁面',
    11500: '服務器發生錯誤,請聯絡管理人員',

    12400: '驗證碼錯誤!',

    // 13200: '角色權限添加成功!!',
    // 13500: '服務器發生錯誤,請聯絡管理人員',
    // 14500: '服務器發生錯誤,請聯絡管理人員',

    20200: '數據添加成功',
    20500: '數據添加失敗,服務器發生錯誤,請聯絡管理人員',
    21500: '獲取數據失敗,服務器發生錯誤,請聯絡管理人員',
    22500: '獲取單一數據失敗,服務器發生錯誤,請聯絡管理人員',
    23200: '數據更新成功',
    23500: '數據更新失敗,服務器發生錯誤,請聯絡管理人員',
    24200: '數據刪除成功',
    24500: '數據刪除失敗,服務器發生錯誤,請聯絡管理人員',
    25500: '取得關聯數據失敗,服務器發生錯誤,請聯絡管理人員',
}
module.exports = {
    _CODE:{
        /** 10000 REGISTER **/
        RIGISTER_SUCCESS : 10200,
        REGISTER_EMAIL_IS_EXSISTE : 10204,
        REGISTER_SEVER_ERROR : 10500,
        /** 11000 LOGIN **/
        LOGIN_SUCCESS: 11200,
        LOGIN_PASSWORD_INCORRENT: 11400,
        LOGIN_MANAGER_NOTEXSIST: 11404,
        LOGIN_SESSION_NOTEXSIST: 11405,
        LOGIN_SEVER_ERROR : 11500,        
        /** 12000 CAPTCHA API**/
        CAPTCHA_ERROR: 12400,
        /** 13000 ROLEACCESSES API **/
        // ROLEACCESSES_ADD_SUCCESS: 13200,
        // ROLEACCESSES_CRUD_ADD_ERROR: 13500,
        //ACCESSES_GETMODULELIST_ERROR: 13500,
        /** 14000 MANAGERS API */
        //MANAGERS_GETMODULELIST_ERROR: 14500,

        /** 20000 COMMOM_CRUD **/
        COMMOM_CRUD_ADD_SUCCESS: 20200,
        COMMOM_CRUD_ADD_ERROR: 20500,
        COMMOM_CRUD_FETCH_ERROR: 21500,
        COMMOM_CRUD_FETCHONE_ERROR: 22500,
        COMMOM_CRUD_UPDATE_SUCCESS: 23200,
        COMMOM_CRUD_UPDATE_ERROR: 23500,
        COMMOM_CRUD_DELETE_SUCCESS: 24200,
        COMMOM_CRUD_DELETE_ERROR: 24500,
        COMMOM__GETSELECTLIST_ERROR: 25500


    },
    CTXBODY (code) { 
        let obj    
        return obj = {
            statusCode: code,
            title: _TITLE[code],
            msg: _MSG[code]
        }
    }
}
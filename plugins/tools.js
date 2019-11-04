import Vue from 'vue'

Vue.prototype.$tools = {
    /*******************************  字符串處理   *******************************   

    /**
     * @desc 替換字串
     * param str 要處理的字符集/oldStr 原字符/newStr 新字符*/
    Repalce(str,oldStr,newStr) {
        let reg = eval("/"+oldStr+"/g");   
        return str.replace(reg,newStr);
    },

    /**
     * @desc 清除兩邊空格
     * param str 要處理的字符集*/
    Trim(str) {
        if (typeof str == 'string') return str.replace(/(^\s*)|(\s*$)/g, '')
    },

    /**
     * @desc 清除前后的非字符
     * param str 要處理的字符集*/
    Strip(str) {
        if (typeof str == 'string') return str.replace(/^\s+/, '').replace(/(^\s*)|(\s*$)/g, '')
    },

    /**
     * @desc 過濾字符里面的HTML標籤
     * param str 要處理的字符集*/
    StripTags(str) {
        if (typeof str == 'string') return str.replace(/<\/?[^>]+>/gi, '').replace(/(^\s*)|(\s*$)/g, '');
    },

    /*******************************  正則驗證類   *******************************
     * @desc 檢測字符長度
     * param str 要檢測的字符集/s 開始長度/l 結束長度
     * returns {boolean}
     */
    IsLen(str,s,l) {
        str = this.Trim(str)
        if (str.length > s && str.length < l ) return true; else return false
    },

    /**
     * @desc 是否為數字型數據
     * param str 要檢測的字符集
     * returns {boolean}
     */    
    IsNumber(str) {
        if (/^\d+$/.test(str)) return true; else return false
    },
    
    /**
     * @desc 是否是自然數型數據
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsInt(str) {
        if (/^(\+|-)?\d+$/.test(str)) return true; else return false
    },

    /**
     * @desc 是否是中文字符
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsChinese(str) {
        if (/^[\一-\龥]+$/.test(str)) return true; else return false
    },

    /**
     * @desc 是否為英文字母
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsLetter(str) {
        if (/^[A-Za-z]+$/.test(str)) return true; else return false
    },

    /**
     * @desc 是否為大寫英文字母
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsUpper(str) {
        if (/^[A-Z]+$/.test(str)) return true; else return false
    },

    /**
     * @desc 是否為小寫英文字母
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsLower(str) {
        if (/^[a-z]+$/.test(str)) return true; else return false
    },

    /**
     * @desc 是否為正確的網址
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsUrl(str) {
        let myReg = /^((http:[/][/])?\w+([.]\w+|[/]\w*)*)?$/; 
        if (myReg.test(str)) return true; else return false
    },

    /**
     * @desc 是否為正確的Email格式
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsEmail(str) {
        let myReg = /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;    
        if (myReg.test(str)) return true; else return false
    },

    /**
     * @desc 是否為正確的手機號碼格式
     * param str 要檢測的字符集
     * returns {boolean}
     */
    IsMobile(str) {
        let regu =/(^[1][3][0-9]{9}$)|(^0[1][3][0-9]{9}$)/;
        let re = new RegExp(regu);
        if (re.test(str)) return true; else return false
    },

    /**
     * @desc 兩個對象鍵值是否相同
     * param a 第一個對象{object}/b 第二個對象{object}
     * returns {boolean}
     */
    isObjectEqual: function(a, b) {
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);
        if (aProps.length !== bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },

     /*******************************  時間轉換   *******************************
     * @desc 獲取當天日期 yyyy-mm-dd */
    GetDateNow() {
        let d, y, m, dd;
        d = new Date(); 
        y = d.getFullYear(); 
        m = d.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        dd = d.getDate();
        dd = dd < 10 ? ('0' + dd) : dd;
        return y + "-" + m + "-" + dd;
    },

    /**
     * @desc 獲取获取指定日期后的特定天数的日期值
     * param toDate 當前指定的日期/N 要添加的日期數
     */
}
import Vue from 'vue'
/** Lang **/
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isLength from 'lodash/isLength'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import toArray from 'lodash/toArray'
import toNumber from 'lodash/toNumber'
import toString from 'lodash/toString'
import escape from 'lodash/escape'
import escapeRegExp from 'lodash/escapeRegExp'

/** String **/

Vue.prototype.$_ = {
    /********************************************    Lang     ********************************************
    /**
     * @desc 检查 value 是否是原始字符串String或者对象
     * type: function(value)
     * param: value (*) :要檢查的值
     * return {boolean} 
     */
    isString,
    
    /**
     * @desc 檢查value是否是Array類對象
     * type: function(value)
     * param: value (*) :要檢查的值
     * return {boolean} 
     */
    isArray,

    /**
     * @desc 檢查value是否是为一个空对象，集合，映射或者set
     * type: function(value)
     * param: value (*) :要檢查的值
     * return {boolean} 
     */
    isEmpty,

    /**
     * @desc 檢查value是否是为一个空对象，集合，映射或者set
     * type: function(value)
     * param: value (*) :要檢查的值
     * return {boolean} 
     */
    isLength,

    /**
     * @desc 檢查value是否是 null
     * type: function(value)
     * param: value (*) :要檢查的值
     * return {boolean} 
     */
    isNull,

    /**
     * @desc 檢查value是否是 undefined.
     * type: function(value)
     * param: value (*) :要檢查的值
     * return {boolean} 
     */
    isUndefined,

    /**
     * @desc 转换 value 为一个数组
     * type: function(value)
     * param: value (*) :要转换的值
     * return {Array}
     */
    toArray,

    /**
     * @desc 转换 value 为一个数字
     * type: function(value)
     * param: value (*) :要转换的值
     * return {Number} 
     */
    toNumber,

    /**
     * @desc 转换 value 为字符串。 null 和 undefined 将返回空字符串。-0 将被转换为字符串"-0"
     * type: function(value)
     * param: value (*) :要转换的值
     * return {String} 
     */
    toString,

    /********************************************    String     ********************************************
     * @desc 转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
     * type: _.escape([string=''])
     * param: [string=''] (string): 要转义的字符串。
     * return {String} 返回转义后的字符串
     */
    escape,

    /**
     * @desc 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 和 "|" in 
     * type: _.escape([string=''])
     * param: [string=''] (string): 要转义的字符串。
     * return {String} 返回转义后的字符串
     */
    escapeRegExp,

    /********************************************    Number     ********************************************
     */    
    
}
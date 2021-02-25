/*杂项工具类*/

/**
 * yyyyMMddhhmmss格式常量
 * @type {string}
 */
const f14 = "yyyyMMddhhmmss";

/**
 * yyyy-MM-dd hh:mm:ss格式常量
 * @type {string}
 */
const f19 = "yyyy-MM-dd hh:mm:ss";

/**
 * 创建一个id
 * 以当前的时间yyyyMMddhhmmss+5位随机数组成一个19位的id
 * @return {string}
 */
let newId = function () {
    let c = new Date().format(f14);
    let r = Math.round(Math.random()*(100000));
    return c + r;
}

/**
 * 获取当前时间yyyyMMddhhmmss的字符串
 * @return {void | string | *}
 */
let getDate14 = function () {
    return new Date().format(f14);
}

/**
 * 获取当前时间yyyy-MM-dd hh:mm:ss的字符串
 * @return {void | string | *}
 */
let getDate19 = function () {
    return new Date().format(f19);
}

/**
 * 获取昨天的日期
 * @return {void | string | *}
 */
let getYestoday = ()=>{
    let day1 = new Date();
    day1.setDate(day1.getDate() - 1);
    return day1.format("yyyy-MM-dd");
}

/**
 * 获取当前时间yyyy-MM-dd hh:mm:ss的字符串
 * @return {void | string | *}
 */
let getDate10 = function () {
    return new Date().format('yyyy-MM-dd');
}

/**
 * 验证字符串长度是否在最大的长度范围内
 * @param str
 * @param maxLength
 * @return {boolean}
 */
let validLength = function (str, maxLength) {
    // 判断字符串是否存在
    if (!str) {
        return false;
    }

    // 判断是否是字符串
    if (typeof str != 'string') {
        return false;
    }

    // 判断字符串长度
    if (str.length <= maxLength) {
        return true;
    } else {
        return false;
    }
}

/**
 * 批量验证长度
 *
 * @param arr [{str:str,maxlength:length}]
 */
let validLengthBatch = function (arr) {
    for (let i = 0, l = arr.length; i < l; i ++) {
        let item = arr[i];
        if (!validLength(item.str, item.maxLength)) {
            console.log(item.str);
            console.log(item.maxLength);
            return false;
        }
    }
    return true;
}

/**
 * 格式化分页页码格式 当pageNo不存在的时候就返回1；
 * @param pageNo
 * @returns {*}
 */
let formatPageNo = function (pageNo) {
    if (pageNo && parseInt(pageNo) > 0) {
        return parseInt(pageNo);
    }
    return 1;
}

/**
 * 格式化分页每页条数 当pageSize不存在的时候就返回10
 * @param pageSize
 */
let formatPageSize = function (pageSize) {
    if (pageSize && parseInt(pageSize) > 0) {
        return parseInt(pageSize);
    }
    return 10;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
/**
 *
 * @param req
 * @param resp
 */
let error=(resp,msg)=>{
    resp.status(500);
    resp.send(msg);
}

module.exports = {
    newId,
    getDate14,
    getDate19,
    getDate10,
    validLength,
    validLengthBatch,
    formatPageNo,
    formatPageSize,
    getYestoday,
    error

}

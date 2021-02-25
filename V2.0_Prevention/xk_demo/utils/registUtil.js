function CheckPassWord(password) {//必须为字母加数字且长度不小于8位
    let str = password;
    if (str == null || str.length <8) {
        return false;
    }
    let reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(str)) {
        return false;
    }
    let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}
module.exports={CheckPassWord}
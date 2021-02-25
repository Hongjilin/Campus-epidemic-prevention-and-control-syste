document.querySelector('#regist_btn').onclick = function () {
    regist()

}
/**
 * 监听焦点事件提示账号密码格式
 */
document.querySelector('#regist_name').onblur = function () {
    let a1 = document.querySelector('#a1')
    if (this.value.length < 3 || this.value.length > 16) {
        a1.style.color = "red"
        a1.innerText = `用户名长度不能少于3或者长于16`
    } else {
        a1.style.color = "blue"
        a1.innerText = `用户名格式正确 `
    }
}
document.querySelector('#regist_pwd').onblur = function () {
    let a2 = document.querySelector('#a2')
    if (!CheckPassWord(this.value)) {
        a2.style.color = "red"
        a2.innerText = `密码长度不能不能少于8位并且要由数字与字母组合`
    } else {
        a2.style.color = "blue"
        a2.innerText = `密码格式正确 `

    }
}


/*注册函数*/
/**
 * 1.前端角度
 a.将图片发给后端 ajax
 1.前端获取图片信息 文件域
 2.将文件信息 存到formdata
 3.调用后端写的api接口发送数据
 b.接受返回的数据
 */
function regist() {
    future.ajax({
        url: '/users/register',
        type: 'post',
        data: {
            username: $('#regist_name').val(),
            password: $('#regist_pwd').val(),
        }, success: function (result) {
            alert("注册成功,跳转回登录界面")
            window.location.href = "../login.html"
        }
    })
}

function CheckPassWord(password) {//必须为字母加数字且长度不小于8位
    let str = password;
    if (str == null || str.length < 8) {
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
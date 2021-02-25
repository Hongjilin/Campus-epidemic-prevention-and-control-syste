let catFalg = false;
$(function () {
    $('#login_btn').on('click', function () {
            login()
    })
})

/**
 * 登录
 */
function login() {
    let chageFalg = false
    future.ajax({
        url: '/users/login',
        type: 'post',
        data: {
            username: $('#login_name').val(),
            password: $('#login_pwd').val(),
            type:2
        },
        success: function (result) {
            console.log(result.username)
            console.log(result)
            chageFalg = true;
            window.localStorage.setItem("token", result.jwt_token);
            alert("登录成功,跳转至主界面")
            window.location.href = "http://localhost:3000/uploadtest.html"
        }, error: function () {
        }
    })
    if (!chageFalg) {
        alert("账户或者密码错误")
    }



}
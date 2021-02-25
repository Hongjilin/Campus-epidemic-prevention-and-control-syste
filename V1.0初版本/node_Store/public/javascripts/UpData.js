/**
 *三个验证按钮
 */
document.querySelector('#youxiang_btn').onclick = function () {
    /**
     * 验证邮箱格式
     */
    let emils = document.querySelector('#personal_emil').value
    let reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    isok = reg.test(emils);
    if (emils.trim().length == 0) {
        alert("验证邮箱不能为空")
    } else if (!isok) {
        alert("邮箱格式不正确，请重新输入！");
    } else {
        fasong(emils)
    }


}
document.querySelector('#Upuser_btns').onclick = function () {
    console.log("点击更改名称")

    upUserName()

}
document.querySelector('#btnUpload').onclick = function () {
    console.log("点击更改头像")
    ajaxFileUpload()
}


function upUserName() {
    future.ajax({
        url: '/users/upName',
        type: 'post',
        data: {
            username: document.querySelector('#personal_name').value,
        }, success: function (result) {
            alert("修改名字成功")
            // window.location.href="../login.html"
        }
    })
}

function ajaxFileUpload() {
    let u_id = localStorage.getItem('u_id')
    console.log(u_id)
    var elementIds = ["flag"]; //flag为id、name属性名
    $.ajaxFileUpload({
        url: 'http://localhost:3000/users/icon',
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'file', // 上传文件的id、name属性名
        dataType: 'text', //返回值类型，一般设置为json、application/json
        // elementIds: elementIds, //传递参数到服务器
        success: function (data, status) {
            alert("头像上传成功");
        },
        error: function (data, status, e) {
            alert("您的网络好像不稳定,头像上传失败");
        }
    });
}


/**
 * 发送邮件
 */
function fasong(emil) {
    let u_id = localStorage.getItem("u_id");
    emailTos(emil, "这是验证码", "点击进行验证", "请您进行验证", function (a) {
    }, u_id);

}

/**
 * 发送邮件
 * @param emil
 * @param title
 * @param content
 * @param htmlCen
 * @param call
 */
function emailTos(emil, title, content, htmlCen, call, u_id) {
    future.ajax({
        url: '/setEM',
        type: 'post',
        data: {
            emil,
            title,
            content,
            htmlCen,
            call,
            u_id
        },
        success: function (result) {
            /*alert(result)*/
            // alert("发送")
            console.log("发邮件")
            console.log(result)
            alert("发送验证成功,请查看邮件进行验证")
        }
    })

}


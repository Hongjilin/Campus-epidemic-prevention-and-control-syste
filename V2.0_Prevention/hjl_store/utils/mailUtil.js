var nodemailer = require("nodemailer");
var smtp = 'smtp.qq.com'
var mailFrom = '1044580210@qq.com'
var mailPwd = 'mkxauxzbwsqsbdbb'

/**
 * 发送邮件
 * @param email xxx@qq.com,yyy@qq.com,zzz@qq.com
 * @param subject 邮件的主题
 * @param text 发送纯文本邮件
 * @param html 发送富文本邮件
 * @param callback 执行完之后的回调函数
 *          回调函数有参数：json对象格式：
 *             var result = {
        httpCode: 200,// 成功为200，失败为500
        message: '发送成功!',
    }
 */

function emailTo(email,subject,text,html,callback) {
    // console.log("jinlai ")
    var transporter = nodemailer.createTransport({
        host: smtp,
        auth: {
            user: mailFrom,
            pass: mailPwd //授权码,通过QQ获取

        }
    });
    var mailOptions = {
        from: mailFrom, // 发送者
        to: email, // 接受者,可以同时发送多个,以逗号隔开
        subject: subject, // 标题
    };
    if(text != undefined)
    {
        mailOptions.text =text;// 文本
    }
    if(html != undefined)
    {
        mailOptions.html =html;// html
    }

    var result = {
        httpCode: 200,
        message: '发送成功!',
    }
    try {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                result.httpCode = 500;
                result.message = err;
                callback(result);
                return;
            }
            callback(result);
        });
    } catch (err) {
        result.httpCode = 500;
        result.message = err;
        callback(result);
    }

}

module.exports={emailTo}
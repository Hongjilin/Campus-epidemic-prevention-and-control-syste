let createError = require('http-errors');
let express = require('express');
//　nodejs 自带 path 模块，在 nodejs 中经常会用到 path 的方法处理路径
let path = require('path');
let cookieParser = require('cookie-parser');
//日志
let logger = require('morgan');
let usersRouter = require('./routes/users');
let uploadRouter = require('./routes/upload');
let studentRouter = require('./routes/students');
let adminRouter = require('./routes/admin');

let app = express();

/**
 * 聊天室端口监听
 */
let server = app.listen(5200)
let io = require('socket.io').listen(server)
//引入自己写的socket.io包
require('./sockets/socket')(io);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
/*io.on('connection', (socket) => {
    console.log('Socket 链接成功!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
});*/


/**
 * 全系统允许跨域处理 这段配置要再new出express实例的时候就要设置了，放在所有的api前面，不然没有效果
 */
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "*");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

// app.use()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*引用session
* */
let session = require('express-session')
/*
*session配置
* */
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    //maxAge:最多可以存活多久
    cookie: ('name', 'value', {maxAge: 5 * 60 * 1000, secure: false})
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
let bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 定义全局的加解密密钥
 * @type {string}
 */
global.globalKey = '123456';
let jwtUtil = require('./utils/jwtUtils');
let redisUtils = require('./utils/redisUtils');

/**
 * 拦截器中间件
 */
/**
 * 拦截器中间件
 */
app.use(async function (req, resp, next) {
    let path = req.path;
    let token = "";
    if (req.body.token)
        token = req.body.token
    else token = req.query.token
    console.log("-------------------------")
    // console.log(token)

    if (path.startsWith("/users")) {
        if (path.startsWith("/users/login") || path.startsWith("/users/getUsersByTypePage") || path.startsWith("/users/getUserDataById")
            || path.startsWith("/users/getUsersByTypePage") || path.startsWith("/users/upicon") || path.startsWith("/users/setXlsxData")
        ) {
            console.log("放行users")
            next()
            return
        }
        console.log("拦截users")
        let result = await jwtUtil.verifysync(token, global.globalKey)
        if (result.err) {
            jwtAtert(resp)
            return
        } else {
            req.headers.session = result
            next();
            return
        }
    }

    if (path.startsWith("/admin")) {
        if (path.startsWith("/admin/getClasses") || path.startsWith("/admin/getAllNotice") || path.startsWith("/admin/getLeave")
            || path.startsWith("/admin/getuserLeave")
        ) {
            console.log("放行admin")
            next()
            return
        }
        console.log("拦截admin")
        let result = await jwtUtil.verifysync(token, global.globalKey)
        if (result.err) {
            jwtAtert(resp)
            return
        } else {
            req.headers.session = result
            next();
            return
        }
    }
    if (path.startsWith("/students")) {
        if (path.startsWith("/students/gethealthNowDay") || path.startsWith("/students/getNotice") || path.startsWith("/students/getAllHealth")
        ) {
            console.log("放行admin")
            next()
            return
        }
        console.log("拦截students")
        let result = await jwtUtil.verifysync(token, global.globalKey)
        if (result.err) {
            jwtAtert(resp)
            return
        } else {
            req.headers.session = result
            next();
            return
        }
    }
    if (path.startsWith("/upload")) {
        next();
        return
    }
    next();

})

/**
 * 未授权返回状态且提示
 * @param resp
 */
function jwtAtert(resp) {
    resp.status(401).send('该功能只能由登录用户使用,请前往登陆页面进行登录后使用')
}

app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/students', studentRouter);
app.use('/admin', adminRouter);
app.use('/test', async (req, resp,) => {
    resp.send(null)
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

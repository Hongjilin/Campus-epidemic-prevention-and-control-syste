var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var uploadRouter = require('./routes/upload');
var studentRouter = require('./routes/student');
var app = express();

/**
 * 聊天室端口监听
 */
let server = app.listen(5200)
let io = require('socket.io').listen(server)
//引入自己写的socket.io包
require('./sockets/socket')(io);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app.listen(, () => console.log(`Example app listening on port ${port}!`))
io.on('connection', (socket) => {
    console.log('Socket 链接成功!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
});





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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const jwtUtil=require('./utils/jwtUtils')
global.globalKey="123456"
app.use(async function (req,resp,next) {
    let path=req.path
    let token="";
    if (req.body.token)  token=req.body.token
    else token = req.query.token
    console.log("-------------------------------------")
    /**
     * 拦截users
     */
    if (path.startsWith("/users")){
        if (path.startsWith("/users/login")||
            path.startsWith("/users/setXlsxData")||
            path.startsWith("/users/getUsersByTypePage")
        ) {
            next()
            return
        }
        console.log("拦截users")
        let result=await  jwtUtil.verifysync(token,globalKey)
        if (result.err){
            jwtAlert(resp)
            return
        }else{
            next()
            return
        }
    }

    /**
     * 拦截admin
     */
    if (path.startsWith("/admin")){
        console.log("拦截admin")
        let result=await  jwtUtil.verifysync(token,globalKey)
        if (result.err){
            jwtAlert(resp)
            return
        }else{
            next()
            return
        }

    }
    /**
     * 拦截student
     */
    if (path.startsWith("/students")){
        if (path.startsWith("/students/gethealthNowDay")||
            path.startsWith("/students/gethealthNowMonth")
        ) {
            console.log("放行students")
            next()
            return
        }
        let result=await  jwtUtil.verifysync(token,globalKey)
        if (result.err){
            jwtAlert(resp)
            return
        }else{
            next()
            return
        }
    }
    /**
     * 拦截upload
     */
    if (path.startsWith("/upload")){
        next()
        return
    }

    
})

/**
 * 未授权返回状态提示
 * @param resp
 */
function jwtAlert(resp){
    resp.status(401).send("该功能只能有登录用户使用,请前往登录页面进行登录")
}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);
app.use('/students',studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

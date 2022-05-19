const path = require('path')
const parameter = require('koa-parameter');
const koa = require("koa")
const cors = require('koa2-cors');
const koaBody = require('koa-body')
const static = require('koa-static')
const app = new koa()
const router = require('../router')





// 在所有路由前注册中间件
app.use(koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, '../upload'),
            keepExtensions: true,

        },
        // 配置这个koaBody才能解析post,put,patch,delete的body参数

        parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
    }))
    // app.use(cors())
app.use(async(ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 500;
    } else {
        await next();
    }
});
app.use(cors())
app.use(static(path.join(__dirname, '../upload')))
app.use(parameter(app))
app.use(router.routes())
    .use(router.allowedMethods())



module.exports = app
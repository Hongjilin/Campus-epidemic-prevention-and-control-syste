// 使用koa
const koa = require('koa')
const router = require('koa-router')()
    // koa-websocket是koa封装好的websocket功能
const websocket = require('koa-websocket')
    // 实例化一个ws服务
const app = websocket(new koa())

// 用来存储建立了的链接，（真实项目中请使用数据库代替）
let wsObj = {}

// 监听koa/ws路由，是否有连接
router.all('/koa/ws', (ctx) => {
        // 客户端链接传过来的客户端身份
        const { id } = ctx.query
            // 将链接保存起来
        wsObj[id] = ctx;
        // 给客户端发送链接成功信息
        ctx.websocket.send('连接成功');
        // 监听客户端发送过来的信息
        ctx.websocket.on('message', function(message) {
            console.log(message);
            // uid为接收方，将接收到的信息发送给接收方uid,可以根据自己的需求处理数据再发送
            const uid = JSON.parse(message).uId;
            if (!wsObj[uid]) {
                ctx.websocket.send(`未上线`)
            } else {
                wsObj[uid].websocket.send(message)
            }

        });
    })
    // 使用路由
app.ws.use(router.routes()).use(router.allowedMethods())

//端口号后面可采用动态的
app.listen(3131, () =>
    console.log('服务启动成功')
)
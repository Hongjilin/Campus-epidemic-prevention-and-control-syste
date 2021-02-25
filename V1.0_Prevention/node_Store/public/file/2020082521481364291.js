/**
 
    element-ui
        饿了么出品 
        针对web ui框架 (包含多个常用的组件)
        不像bootstrap(不是框架) 知识一个简单的代码段

        框架  有一套组件  jquery
        n个组件组成的
            因此引用有两种方式
                1. 完全引用  开发时候建议  避免上生产(替代方案:cdn)
                2. 按需引用  上生产(大大减少小dist的体积)
            安装:
                建议使用yarn安装,速度会快几十倍
                局部安装(是依赖)
            使用:
                完整引入:
                     第一步引入js
                     第二部引入css
                     第三步注册(因为elementui会往vue上注册很多类似)


    
    mui 伴随着项目

    v-chars
    
    v-count
 */
/**
    axios安装
     安装 yarn add axios
     封装插件
            半成品(没有加载等待框)
            先inrushaxios
            封装axios的基本用法
            挂载到vue的类上面
            使用:this.$axios
    源码解析:
        post场景
            1)传递JSON类型,默认content-type
                参数以requset payload(请求体)作为媒介进行传递
                -->服务端没有接收到参数
                -->上述问题可以从服务端进行解决
            2)服务端默认接受的参数上下文的类型是urlencode .json
              服务端缺少相应的上下文类型进行格式化的中间件
              -->添加中间件即可
            3)既然服务端只能接受urlencode类型,那么是否可以设置前端请求的参数
                的上下文类型content-type application/www
                3-1)全局设置
                3-2)局部设置
                        参数也变成了urlencode格式的参数类型,即form data
                        key:value 都有,但是key变成了json对象的序列化value为空
                        --问题出现 参数被错误解析
                        --问题分析
                            会去判断是否当前的参数是json对象
                                yes:将参数序列化
                                no:判断参数是否是UrlSearchParams类型对象
                                    yes: 自动设置上下文位urlencode
                                        同时将参数编程form data
                                判断当前的请求类型是否位post 如果是,那么将会序列化
                                    字符串直接丢到请求体
                                判断当前的请求的上下文是否为www.x.rul....is-justify-space-around
                                    yes:自动组装form data对象
                                        自动将序列化
            4)解决方案:
                1[推荐这种]服务端添加json类型参数的parse中间件-->app.use(body-par...)
                    为什么ajax请求没有这个问题:
                        ajax会自动将json类型的参数的post请求的上下文转为urlncode
                        默认服务端用的oist参数解析中间件也是urlencode
                    为什么koa框架没有这个问题
                        koa的post参数的中间件叫做:koa-bodyparser
                        使用方式:
                            app.use(body.parser())

                2前端post类型参数使用urlSearchParams进行封装
                     let tmp =new URLSearchParams();
                    tmp.append('belongId','0000000')


 */
/*
 1. mui
        移动端的应用开发
            通常不用纯原生的开发
             ios      ios
             android    android
             塞班       诺基亚
                应运而生 H5开发(app)
                    开发一次  可以同时在多个系统上运行
                    涉及到底层的东西,可能会实现不了
                流应用环境 : mui

                winphone   ->触摸屏

        










2. element-ui
    布局
        Layout 布局
            通过基础的 24 分栏，迅速简便地创建布局。
    使用准则
        1. 抛弃曾经自以为是的标签
            标签名称 标签的时间
            el-row
            el-col
        2. el 跟vue结合
            所有的事件都应该通过绑定vue事件的方式来进行绑定
                @ : 
        3.  el-button      
                type 7类型
                disabled 禁用
                plain 
                round
                circle
                icon
                :loading

        4.表单类标签
            form 
            select
            input
            textarea
        
        5.单选框 复选框 下拉框
            获取值容易,设置值难
            原生里头的:
                获取值难,设置简单

            组概念 => name
            设置值和获取值 通过组的v-model
            渲染视图:{{}}设置text
            disabled

            下拉框:
                label表示是显示给用户看的
                value 表示

        6. el-input
            	text，textarea 和其他 原生 input 的 type 值

        7. el-table
            分页查询要返回记录列表  =>total
            纪录列表要绑定给el-page
            给el-page绑定siez-change  current-change方法  每次出发该方式的时候修改pageSize
            和pageNo 然后再重新跟pageSize和pageNo去服务器查找数据

        10. el-backtop
            返回顶部
            基本上没有找到根治的方法
                cl-backtop 官网也没有详细的使用方案
                    el-backtop监听它要监听的元素的滚动情况
                        通过target来配置
                    target元素
                        必须是一个定高的且会在合适时机产生滚动条的元素
                        错误:

                    target可以缺省
                        target监听的body元素
                        因为:默认情况下,body的高度就是固定的,当内容超过body高度时,
                                body会自动产生滚动条
                    当使用了el-backtop却不生效
                        1. 被监听的元素不存在  控制台就会报错
                        2. 被监听的元素不存在滚动条
                            overflow设置成了hidden
                        3. 被监听的元素没有定高,那么同样的不会产生滚东条
                        4. 存在层级层级嵌套关系
                            所有的层数除了最外层必须定高之外
                            内层所有的子元素必须

*/
/**
    
        CDN
            什么时CDN
            为什么使用cdn
            项目为什么引入CDN

            CDN怎么再项目中使用 
                1)在 bootcdn查找需要的
                2) 将需要的cdn配到index.html里头
                3) 取出所有本地的依赖包 起初所有的import依赖包的代码
                4) 配置不走本地依赖打包的配置信息

 */

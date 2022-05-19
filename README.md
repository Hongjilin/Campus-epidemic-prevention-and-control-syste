<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-05-19 10:10:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-05-19 10:25:32
-->
# 校园疫情防控管理系统

#### 介绍

>该项目为本人毕设项目源码
>
>V1.0为初始版本,进行全部功能实现
>	v2.0为针对v1.0的优化版本,进行node后台代码优化,以及前端代码微调
>
>这个项目由本人全部纯手敲设计,包括接口文档,思维导图等.................
>
>本人毕生所学分享:[`学习笔记`](https://gitee.com/hongjilin/hongs-study-notes)

#### 技术栈
>1.使用vue+element+vchar框架进行前端开发
>
>2.使用nodejs+express+mysql+socket进行后台开发
>
>3.前后端分离开发
>
>4.其中使用到的一些可以但没必要的技术(如:Redis),纯属本人练手而使用
>
>5.如果node项目启动报错,可能是没有开Redis数据库,我会把免安装版压缩包传上来

#### 相关视频
>本人在B站录制了本项目node与前后端交互渲染部分的教学视频,有需要的可以去看:
>
>[视频链接](https://www.bilibili.com/video/BV1Z54y1y79p)
>
>跟着敲就可以写出全部node代码与前端渲染部分了,源码看的不明白的又想改功能的同学可以去看下

#### 使用说明
>1. 本项目使用了`Redis`,主要就是为了练习这一知识点,所以需要先打开Redis数据库(该免安装文件包传在tools中,直接点击运行即可),当然你要是不想,可以自己改一下源码把解析文件那备份重写即可 :ok_hand: 还有`记得先创建mysql数据库与表结构!!创表语句我在接口文档中给出了`
>2. Redis免安装版百度云分享：https://pan.baidu.com/s/11W2gQIqiqUOD5t12VnKlcg  提取码：iawv
>2. 下载项目第一步`yarn`或者`npm i`所有依赖,其次你需要有安装node环境(很简单,去官网下载一个exe安装即可)
>
>3. 运行node端代码:`npm run start`  or `yarn start`
>
>4. 运行前端部分项目:`npm run serve` or `yarn serve`  或者`npm run build`
>
>5. 不要跟我说你前后端代码哪个都分不清 :smirk: ,然后这个名字是因为本来准备写一个商城项目,但是疫情期间突然就想写一个疫情管理系统,就懒得改项目名直接改了.不要吐槽
>
>6. 因为git上传忽略空文件夹,但是本项目导入用户数据部分需要一个空文件夹来做文件暂存,其中什么文件都不能有``包括隐藏文件``,所以需要在此文件目录下(``服务器代码``-->``public目录``-->`新建upload文件夹`)创建一个空文件夹`upload`,(也不能有``.gitkeep`文件)![输入图片说明](https://images.gitee.com/uploads/images/2021/0509/133502_a804b394_4995263.png "image-20210509132904648.png")
>
>7. 这边说明一个错误:如果你发现你的报错含有'``3306` `127.0.0.1`'这种肯定就是`Mysql数据库`报错了,然后创建数据库的时候记得,主键是自增的(例如健康表的`h_id`要勾选AI项),如果不会的就去找我的接口文档最下方,我写了`创表sql语句`.其实这个我本来是觉得不用说的,感觉这就是基础,不过我发现竟然有同学mysql数据库都没装就开始运行代码,还问我怎么运行都运行不了,这我该怎么说呢....
>
>8. 用爱发电,给个star不过分吧


#### 声明
>此项目编写时还是学生,之前大一大二是学习java与C语言.本项目是node+vue,在后面大三才接触学习前端相关知识,只学了半个多月就写了这个项目,代码质量不一定写得很好,请多海涵 
>2021届

#### 大致实现效果图(部分功能展示)
1. 思维导图
![思维导图](https://images.gitee.com/uploads/images/2021/0319/104727_a03236a2_4995263.png "思维导图.png")
2.部分首页
![部分首页](https://images.gitee.com/uploads/images/2021/0319/104801_5e06ff90_4995263.png "部分首页.png")
3.登陆界面
![输入图片说明](https://images.gitee.com/uploads/images/2021/0319/104835_0dd202f2_4995263.png "登陆页面.png")
4.管理员页面
![管理员页面](https://images.gitee.com/uploads/images/2021/0319/104901_866219d0_4995263.png "管理员页面.png")
5.解析Excel文件导入用户信息
![解析excel文件导入用户信息](https://images.gitee.com/uploads/images/2021/0319/104948_130467c9_4995263.png "解析导入表格文件.png")
6.管理员与教师查看学生信息详情
![管理员与教师查看学生信息详情](https://images.gitee.com/uploads/images/2021/0319/105042_0d281e22_4995263.png "管理与教师页.png")
7.发布通知
![发布通知](https://images.gitee.com/uploads/images/2021/0319/105136_d760c236_4995263.png "发布通知.png")
8.查看通知详情
![查看通知详情](https://images.gitee.com/uploads/images/2021/0319/105202_046c5484_4995263.png "通知详情.png")
9.教师请假审批
![教师请假审批](https://images.gitee.com/uploads/images/2021/0319/105234_f9e7abd1_4995263.png "教师_请假申请.png")
10.学生请假申请
![学生请假申请](https://images.gitee.com/uploads/images/2021/0319/105301_b1e5496a_4995263.png "学生_请假申请.png")
11.学生获取个人通知
![学生个人通知](https://images.gitee.com/uploads/images/2021/0319/105326_3381ff53_4995263.png "学生_个人通知.png")
12.通用部分_修改本账户信息
![修改个人信息](https://images.gitee.com/uploads/images/2021/0319/105355_82ea4df6_4995263.png "通用_修改个人信息.png")
13.全校群聊 
![群聊](https://images.gitee.com/uploads/images/2021/0319/105438_ef3cbbd3_4995263.png "群聊.png")
# 校园疫情防控管理系统

#### 介绍
本人毕设项目源码

V1.0为初始版本,进行全部功能实现
v2.0为针对v1.0的优化版本,进行node后台代码优化,以及前端代码微调

这个项目由本人全部纯手敲设计,包括接口文档,思维导图等.................

#### 技术栈
1.使用vue+element+vchar框架进行前端开发

2.使用nodejs+express+mysql+socket进行后台开发

3.前后端分离开发

4.其中使用到的一些可以但没必要的技术(如:Redis),纯属本人练手而使用

5.如果node项目启动报错,可能是没有开Redis数据库,我会把免安装版压缩包传上来

#### 相关视频
本人在B站录制了本项目node与前后端交互渲染部分的教学视频,有需要的可以去看:
[视频链接](https://www.bilibili.com/video/BV1Z54y1y79p)

#### 使用说明
1.本项目使用了Redis,主要就是为了练习这一知识点,所以需要先打开Redis数据库(该免安装文件包传在tools中,直接点击运行即可),当然你要是不想,可以自己改一下源码把解析文件那备份重写即可 :ok_hand: 
2.运行node端代码:`npm run start`  or `yarn start`
3.运行前端部分项目:`npm run serve` or `yarn serve`  或者`npm run build`
4.不要跟我说你前后端代码哪个都分不清 :smirk: ,然后这个名字是因为本来准备写一个商城项目,但是疫情期间突然就想写一个疫情管理系统,就懒得改项目名直接改了.不要吐槽

#### 声明
本人还是学生,之前大一大二是学习java与C语言.本项目是node+vue,在后面大三才接触学习前端相关知识,代码质量不一定写得很好,请多海涵 
2021届

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
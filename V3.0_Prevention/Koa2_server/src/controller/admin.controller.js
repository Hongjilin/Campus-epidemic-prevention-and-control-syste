const { UsersByTypePage, findDaochu } = require('../service/admin.sercice')
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')
const downPath = path.resolve(__dirname, '../upload');

class adminController {
    // 对用户信息与数量获取
    async getUsersByTypePage(ctx) {
        const { type, pageNum, currPage } = ctx.request.query
        const res = await UsersByTypePage(type, pageNum, currPage)
        ctx.body = {
            message: "获取用户信息成功",
            result: res
        }
    }




    // 用户文件上传
    async upload(ctx) {





    }


    // 导出健康表
    async daochu(ctx) {
        const res = await findDaochu()
        const list = Array.from(res)
        ctx.body = list

    }
}
module.exports = new adminController
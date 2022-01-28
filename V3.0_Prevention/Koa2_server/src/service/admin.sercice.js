const User = require('../model/user.model')
const Health = require('../model/healthy.model')
module.exports = {
    // 从数据库中获取用户信息和数量
    async UsersByTypePage(type, pageNum, currPage) {
        // const offset = (pageNum - 1) * currPage
        const offset = (currPage - 1) * pageNum
        const { count, rows } = await User.findAndCountAll({ where: { type }, offset, limit: pageNum * 1 })
        console.log(count);
        return {
            pageNum,
            currPage,
            total: count,
            list: rows
        }
    },


    // 导出填报表数据
    async findDaochu() {
        const res = await Health.findAll()

        return res
    }
}
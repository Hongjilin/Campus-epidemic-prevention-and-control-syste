const User = require('../model/user.model')
const Health = require('../model/healthy.model')
const Notice = require('../model/notice.model')
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
    },

    async findallHealthy({ pageNum, currPage, hot, gohighrisk, ishesuan, college }) {
        const whereOpt = {}
        hot && Object.assign(whereOpt, { hot })
        gohighrisk && Object.assign(whereOpt, { gohighrisk })
        college && Object.assign(whereOpt, { college })
        const offset = (currPage - 1) * pageNum
        console.log(whereOpt, pageNum, currPage);
        const { count, rows } = await Health.findAndCountAll({ where: whereOpt, offset, limit: pageNum * 1 })

        return {
            pageNum,
            currPage,
            total: count,
            list: rows
        }
    },
    async findUserData({ classes, grade, college, pageNum, currPage }) {
        const whereOpt = {}
        classes && Object.assign(whereOpt, { classes })
        grade && Object.assign(whereOpt, { grade })
        college && Object.assign(whereOpt, { college })
        const offset = (currPage - 1) * pageNum
        console.log(whereOpt, pageNum, currPage);
        const { count, rows } = await User.findAndCountAll({ where: whereOpt, offset, limit: pageNum * 1 })

        return {
            pageNum,
            currPage,
            total: count,
            list: rows
        }
    },


    async uploadData(res) {

        const res1 = await Health.bulkCreate(res)
        console.log();
        return res1
    },
    async uploadUserData(res) {
        return await User.bulkCreate(res)

    },
    async createNovice(value) {
        return await Notice.create(value)

    }
}
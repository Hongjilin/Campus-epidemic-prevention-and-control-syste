const Health = require('../model/healthy.model')
const User = require('../model/user.model')

module.exports = {
    // 查询数据库中有没有该用户名
    async getUserInfo(id) {

        // id && Object.assign(whereOpt, { id })
        // username && Object.assign(whereOpt, { username })

        const res = await User.findOne({
            // 查询到的字段
            attributes: ['id', 'username', 'password', 'head', 'mailbox', 'address', 'sex', 'classes', 'type', 'college', 'grade'],
            where: { id }

        })

        return res ? res.dataValues : null
    },


    // 修改旧密码写进数据库
    async updateById({ id, password }) {


        const res = await User.update({ password }, { where: { id } })

        return res[0] > 0 ? true : false
    },

    // 修改数据库的head
    async updateIcon(id, head) {
        const res = await User.update({ head }, { where: { id } })
        console.log(res);
        return res[0] > 0 ? true : false
    },


    // 查询今日发烧总数
    async findUserfever(filldata) {
        const res = await Health.count({
            where: { filldata, hot: "是" }
        })
        console.log(res);
        return res
    },


    // 查询经过高危地区人数
    async findgohisk(filldata) {
        const res = await Health.count({
            where: { filldata, gohighrisk: "是" }
        })
        console.log(res);
        return res
    },

    async findfill(filldata) {
        const res = await Health.count({
            where: { filldata }
        })
        console.log(res);
        return res
    }
}
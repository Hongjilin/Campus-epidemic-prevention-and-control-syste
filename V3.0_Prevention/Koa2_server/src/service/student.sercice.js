const Health = require('../model/healthy.model')
const Leave = require('../model/leave.model')
class studentSercice {
    // 健康填报写进数据库
    async createHealth(value) {
        // const res = await Health.findOne({
        //     attributes: ['u_id', 'createdAt'],
        //     where: { u_id }
        // })
        // const data = res.dataValues.createdAt
        console.log(value)
        return await Health.create(value)

    }

    // 请假申请写进数据库
    async createLeave({ id, username, classes, reason, startime, endtime, college, grade }) {


        return await Leave.create({ u_id: id, username, reason, classes, startime, state: 0, endtime, college, grade })
    }

    // 获取个人请假表
    async findmyLeave(id) {
        const res = await Leave.findAll({
                attributes: ['u_id', 'username', 'reason', 'startime', 'endtime', 'state', 'classes'],
                where: { u_id: id },
            })
            // console.log(res, "-----------", res[0], 29);
            // console.log(res, 29);
            // console.log("aaaaa", res.dataValues);
            // return res ? res.dataValues : null
        return res
    }

    // 获取当天填报表
    async findmyhealth(id, nowdata) {
        const res = await Health.findOne({
            where: { u_id: id, filldata: nowdata }
        })
        return res
    }
}

module.exports = new studentSercice()
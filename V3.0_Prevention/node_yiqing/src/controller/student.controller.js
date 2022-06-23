const { createHealth, createLeave, createTravel, findmyLeave, findmyhealth, updateXC, updateZP, findmyTravel } = require('../service/student.sercice')
const path = require('path')
class studentController {

    // 健康填报
    async sethealth(ctx) {
        const { temperature, hot, gohighrisk, ishesuan, filldata, address } = ctx.request.body
        const { id: u_id, username, college } = ctx.state.user
        console.log(ctx.state.user);

        await createHealth({ u_id, temperature, hot, gohighrisk, ishesuan, username, college, filldata, address })

        ctx.body = "填写成功"
    }

    // 请假申请
    async setLeave(ctx) {
            const { id, username, classes } = ctx.state.user
            const { reason, startime, endtime, college, grade } = ctx.request.body
            try {
                await createLeave({ id, username, classes, reason, startime, endtime, college, grade })

            } catch (error) {
                console.log(error);
            }

            ctx.body = "请假申请提交成功"
        }
        // 提交行程管理数据
    async subTravel(ctx) {
        const { address, chuxing, city, classes, college, date, grade, risk, sex, telephone, u_id, username } = ctx.request.body
        try {
            await createTravel({ address, chuxing, city, classes, college, date, grade, risk, sex, telephone, u_id, username })
            ctx.body = {
                code: 0,
                res: '提交成功'
            }
        } catch (error) {
            console.log(error);
        }

    }

    // 查询行程数据
    async findTravel(ctx) {
        const { id: u_id } = ctx.state.user
        const res = await findmyTravel(u_id)
        ctx.body = res
    }



    // 获取个人请假表
    async getmyLeave(ctx) {
        const { id } = ctx.state.user

        const res = await findmyLeave(id)

        ctx.body = res
    }

    async gethealth(ctx) {
        const { id } = ctx.state.user
        const { nowdata } = ctx.request.query
        const res = await findmyhealth(id, nowdata)
        ctx.body = { res }
    }

    async uploadXC(ctx) {
        const { id } = ctx.params
        const { file } = ctx.request.files || {}

        if (!file) return
        const uploadXC = path.basename(file.path)
        const res = await updateXC(id, uploadXC)

        if (res) {
            ctx.body = {
                success: true,
                msg: '"成功"'
            }
        } else {
            ctx.body = {
                success: false,
                msg: '"请重新上传"'
            }
        }
    }

    async uploadZP(ctx) {
        const { id } = ctx.params
        const { file } = ctx.request.files || {}

        if (!file) return
        const uploadXC = path.basename(file.path)
        const res = await updateZP(id, uploadXC)

        if (res) {
            ctx.body = {
                success: true,
                msg: '"成功"'
            }
        } else {
            ctx.body = {
                success: false,
                msg: '"请重新上传"'
            }
        }
    }
}

module.exports = new studentController()
const { createHealth, createLeave, findmyLeave, findmyhealth } = require('../service/student.sercice')

class studentController {

    // 健康填报
    async sethealth(ctx) {
        const { temperature, hot, gohighrisk, ishesuan, filldata } = ctx.request.body
        const { id: u_id, username, college } = ctx.state.user
        console.log(ctx.state.user);

        await createHealth({ u_id, temperature, hot, gohighrisk, ishesuan, username, college, filldata })

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
}

module.exports = new studentController()
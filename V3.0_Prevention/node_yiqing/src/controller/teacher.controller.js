const { findLeave, updateLeaveState, findHealthy, findTeavel, findUser, findHealthyId } = require('../service/teacher.service')
class teacherController {
    async getLeave(ctx) {
        const { college } = ctx.state.user
        const { pageNum, currPage, grade, classes } = ctx.request.query
        const res = await findLeave({ college, pageNum, currPage, grade, classes })
        console.log(college);
        ctx.body = {
            res
        }
    }

    async getHealthy(ctx) {
        const { college } = ctx.state.user
        const { pageNum, currPage, hot, gohighrisk, ishesuan } = ctx.request.query
        const res = await findHealthy({ college, pageNum, currPage, hot, gohighrisk, ishesuan })
        ctx.body = {
            res
        }
    }

    async allTeavel(ctx) {
        const { college } = ctx.state.user
        const { pageNum, currPage, grage, classes, u_id, risk, sex, username } = ctx.request.body
        const res = await findTeavel({ college, pageNum, currPage, grage, classes, u_id, risk, sex, username })
        ctx.body = res

    }

    // 查询未打卡的学生数据
    async notClock(ctx) {
        const { college } = ctx.state.user
        const { grade, classes, filldata } = ctx.request.body
            // 查找本学院已打卡学生
        const res1 = await findHealthyId({ college, filldata })
        let arr = []
        res1.map(item => { arr.push(item.u_id) })
            // 从用户表中查找本学院学生-已打卡学生=未打卡学生
        const res = await findUser(arr, { college, grade, classes })
        ctx.body = res
    }

    // 请假审批(修改审批状态)
    async upLeaveState(ctx) {
        const { id, state } = ctx.request.query

        const res = await updateLeaveState(id, state)

        if (res) {
            ctx.body = "修改状态成功"
        } else {
            ctx.body = "修改状态失败"
        }


    }
}

module.exports = new teacherController()
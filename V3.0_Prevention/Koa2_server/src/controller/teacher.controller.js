const { findLeave, updateLeaveState } = require('../service/teacher.service')
class teacherController {
    async getLeave(ctx) {
        const { college } = ctx.state.user
        const { pageNum, currPage } = ctx.request.query
        const res = await findLeave({ college, pageNum, currPage })
        console.log(college);
        ctx.body = {
            res
        }
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
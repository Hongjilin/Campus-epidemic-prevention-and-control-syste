const Leave = require('../model/leave.model')

class teacherService {
    async findLeave({ college, pageNum, currPage }) {
        // const offset = (pageNum - 1) * currPage
        const offset = (currPage - 1) * pageNum
        const { count, rows } = await Leave.findAndCountAll({ where: { college }, offset, limit: pageNum * 1 })

        return {
            pageNum,
            currPage,
            total: count,
            list: rows
        }
    }

    async updateLeaveState(id, state) {
        try {
            const res = await Leave.update({ state }, { where: { id } })
            console.log(res);
            return res[0] > 0 ? true : false
        } catch (error) {
            console.log(error);
        }




    }
}

module.exports = new teacherService()
const Health = require('../model/healthy.model')
const Leave = require('../model/leave.model')
const Travel = require('../model/travel.model')
const User = require('../model/user.model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class teacherService {
    async findLeave({ college, pageNum, currPage, grade, classes }) {
        // const offset = (pageNum - 1) * currPage

        const whereOpt = {}
        grade && Object.assign(whereOpt, { grade })
        classes && Object.assign(whereOpt, { classes })
        const offset = (currPage - 1) * pageNum
        const { count, rows } = await Leave.findAndCountAll({ where: {...whereOpt, college }, offset, limit: pageNum * 1 })

        return {
            pageNum,
            currPage,
            total: count,
            list: rows
        }
    }
    async findUser(arr, { college, grade, classes }) {

        const whereOpt = {}
        grade && Object.assign(whereOpt, { grade })
        classes && Object.assign(whereOpt, { classes })
        const res = await User.findAll({
            where: {
                id: {
                    [Op.notIn]: arr
                },
                type: 2, //查询的类型是学生
                college,
                ...whereOpt
            }
        })
        return res
    }
    async findHealthyId({ college, filldata }) {
        const res = await Health.findAll({
            where: {
                college,
                filldata
            },
            attributes: ['u_id']
        })
        return res
    }

    async findTeavel({ college, pageNum, currPage, grade, classes, u_id, risk, sex, username }) {
            const whereOpt = {}
            grade && Object.assign(whereOpt, { grade })
            classes && Object.assign(whereOpt, { classes })

            classes && Object.assign(whereOpt, { classes })
            u_id && Object.assign(whereOpt, { u_id })
            risk && Object.assign(whereOpt, { risk })
            sex && Object.assign(whereOpt, { sex })
            username && Object.assign(whereOpt, { username })
            const offset = (currPage - 1) * pageNum
            const { count, rows } = await Travel.findAndCountAll({ where: {...whereOpt, college }, offset, limit: pageNum * 1 })

            return {
                pageNum,
                currPage,
                total: count,
                list: rows
            }

        }
        // 查询健康表(按类型查询)
    async findHealthy({ college, pageNum, currPage, hot, gohighrisk, ishesuan }) {
        const whereOpt = {}
        hot && Object.assign(whereOpt, { hot })
        gohighrisk && Object.assign(whereOpt, { gohighrisk })
        ishesuan && Object.assign(whereOpt, { ishesuan })
        const offset = (currPage - 1) * pageNum
        console.log(whereOpt, pageNum, currPage);
        const { count, rows } = await Health.findAndCountAll({ where: {...whereOpt, college }, offset, limit: pageNum * 1 })

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
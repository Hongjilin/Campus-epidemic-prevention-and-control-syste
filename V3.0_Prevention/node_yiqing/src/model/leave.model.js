const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建用户模型

const Leave = seq.define('leave', {
    // id 会被sequelize自动创建
    u_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endtime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    classes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'leave',
    timestamps: false
})

Leave.sync()

module.exports = Leave
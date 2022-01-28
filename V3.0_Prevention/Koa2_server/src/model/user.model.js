const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建用户模型

const User = seq.define('user', {
    // id 会被sequelize自动创建
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    head: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    mailbox: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mailbox: {
        type: DataTypes.STRING,
        allowNull: true
    },
    classes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '1管理员2学生3教师'
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'user',
    timestamps: false
})

User.sync()

module.exports = User
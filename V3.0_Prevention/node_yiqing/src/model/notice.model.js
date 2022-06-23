const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建用户模型

const Notice = seq.define('notice', {
    // id 会被sequelize自动创建

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },

    createtime: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }

}, {
    tableName: 'notice',
    timestamps: false
})

Notice.sync()

module.exports = Notice
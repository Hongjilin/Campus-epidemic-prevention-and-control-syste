const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建行程管理模型

const Travel = seq.define('travel', {
    // id 会被sequelize自动创建
    u_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    risk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chuxing: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uploadXC: {
        type: DataTypes.STRING,
        allowNull: true
    },
    uploadZP: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'travel',
    timestamps: false
})

Travel.sync()

module.exports = Travel
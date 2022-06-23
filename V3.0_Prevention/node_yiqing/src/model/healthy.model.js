const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建用户模型

const Health = seq.define('health', {
    // id 会被sequelize自动创建

    u_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    hot: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gohighrisk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ishesuan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filldata: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'health',
    timestamps: false
})

Health.sync()

module.exports = Health
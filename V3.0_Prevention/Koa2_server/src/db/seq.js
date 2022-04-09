const { Sequelize } = require('sequelize')

const seq = new Sequelize('vue_store', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

// seq.authenticate().then(() => {
//     console.log('数据库链接成功');
// }).catch(err => {
//     console.log(err);
// })

module.exports = seq
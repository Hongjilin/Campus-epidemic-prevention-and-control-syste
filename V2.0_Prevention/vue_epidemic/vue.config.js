module.exports = {
    devServer:{
        port:80
    },
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true
}

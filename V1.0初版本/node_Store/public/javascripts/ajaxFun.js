/**
 * 封装
 * @type {{}}
 */
let future = {};
//修改跨域
future.baseurl = 'http://localhost:3000';
//自定义ajax函数
future.ajax = function (options) {
    // console.log(future.baseurl+options.url)
    $.ajax({
        url: future.baseurl + options.url,
        type: options.type || 'post',
        async: options.async || false,
        data: options.data,
        success: function (result) {
            if (options.success) {
                options.success(result)
            }
        }, error: function (error) {
            if (options.error) {
                options.error(error)
            } else {
                alert(error.responseText)
            }
        }
    })

}
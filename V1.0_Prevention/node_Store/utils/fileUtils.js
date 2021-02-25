// 文件工具类
const fs = require("fs");
const formidable = require("formidable");
const tools = require("./tools");

/**
 * 上传文件
 * @param req
 * @param options 配置formidable和文件路径的相关参数
 *  eg:{
 *      fileDir:"public/file", 文件存放路径 相对于被引用的位置的相对位置，也可以使用绝对路径
 *      maxFileSize :200 * 1024 * 1024， 文件最大的大小 单位byte
 *      fileName:"userIcon.png"
 *  }
 */
function upload(req, options) {
    if (!options) {
        options = {};
    }
    // 文件存放目录  该目录是以被引用的位置作为相对位置。
    var cacheFolder = options.fileDir || 'public/file';
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
    }
    let form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = cacheFolder; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFileSize = options.maxFileSize || 200 * 1024 * 1024; //文件大小
    form.type = true;
    return new Promise(function(resolve, reject){
        form.parse(req, function(err, fields, files) {
            console.log(`接受到的参数${fields}`)
            if (err) {
                // 遗留问题：上传文件异常，不会马上返回，会卡在这边，直到超时
                console.log(`文件上传异常：${err.message}`);
                reject({error: err.message});
            } else {
                // 重命名
                let avatarName = options.fileName;
                if (!avatarName) {
                    //后缀名
                    let extName = '';
                    let fileOriginName = files.file.name;
                    // 判断是否有后缀名
                    if (fileOriginName.indexOf(".") > -1) {
                        let nameArray = fileOriginName.split(".");
                        extName = '.' + nameArray[nameArray.length - 1];
                    }
                    avatarName = tools.newId() + extName;
                }

                let newPath = form.uploadDir + '/' + avatarName;
                fs.renameSync(files.file.path, newPath); //重命名
                console.log(`文件上传成功：${avatarName}`);
                resolve(avatarName);
            }
        });
    });
};

module.exports = {
    upload
};

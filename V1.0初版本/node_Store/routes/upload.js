let express = require('express');
let router = express.Router();
let user = require('../middleware/user_mid')
const fileUp = require('../utils/fileUtils')
const redisUtils = require('../utils/redisUtils')
let xlsx = require('node-xlsx');
let formidable = require('formidable');
let http = require('http');
let util = require('util');
let fs = require('fs');
let path = require('path');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
/**
 * 上传路由
 */
router.post('/upload', function (req, res, next) {
    console.log(" ########## POST /upload ####### ");
    let fileTypeError = false;
    let target_path =".\\public\\upload";
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.uploadDir = target_path;

    let fields = [];
    let files = [];

    form.on('field', function (field, value) {
        fields.push([field, value]);
    });
    form.on('file', function (field, file) {
        console.log('upload file: ' + file.name);
        let filext=file.name.substring(file.name.lastIndexOf("."),file.name.length )

        //推断文件类型是否是xlsx
        if (filext != ".xlsx") {
            redisUtils.set("xlsxData", "err", 3600)
            fileTypeError = true;
        }else{
            fileTypeError=false;
            return;
        }
        files.push([field, file]);
    });
    form.on('end',async function () {
        //遍历上传文件
        let fileName = '';
        let obj = '';
        let exfalg=true;
        let folder_exists =  fs.existsSync(target_path);
        if (folder_exists) {
            let dirList =   fs.readdirSync(target_path);
            console.log("disList",dirList)
            dirList.forEach(function (item) {
                if (!fs.statSync(target_path + '\\' + item).isDirectory()) {
                    console.log('parse item:' + target_path + '\\' + item);
                    fileName = target_path + '\\' + item;
                    if (!fileTypeError) {
                        obj = xlsx.parse(fileName);
                        redisUtils.set("xlsxData", JSON.stringify(obj), 3600)
                        res.send({"rtnCode": "0", "rtnInfo": "成功导入数据","data":obj});
                    } else {
                        //解析失败返回格式错误
                        res.send({"rtnCode": "1", "rtnInfo": "文件格式不对"}) ;
                        exfalg=false;
                    }
                    //导入后删除文件
                    fs.unlinkSync(fileName);
                }
            });
            console.log(JSON.stringify(obj));

        }else{
            res.send({"rtnCode": "1", "rtnInfo": "系统错误"});
            return;
        }
    });
    form.on('error', function(err) {
        res.send({"rtnCode": "1", "rtnInfo": "上传出错"});
    });
    form.on('aborted', function() {
        res.send({"rtnCode": "1", "rtnInfo": "放弃上传"});
    });
    form.parse(req);
    /*    //返回上传进度
        form.on('progress', function(bytesReceived, bytesExpected) {
            var progress = {
                type: 'progress',
                bytesReceived: bytesReceived,
                bytesExpected: bytesExpected
            };
            socket.broadcast(JSON.stringify(progress));
        });*/
});



module.exports = router;

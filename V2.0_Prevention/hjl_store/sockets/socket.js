module.exports = function (io) {
    var socketList = {};
    var users = [];
    io.on('connection', function (socket) {
        // console.log('链接成功！');
        // console.log('链接用户：' + socket.id)
        socket.on('message', msgData => {
            console.log('接收到消息：' + msgData.msg)
            io.emit('getmsg', {target: socket.id, msgData, date: Date.now()})
        })
        socket.on('messageo', msgData => {
            console.log('接收到消息：' + msgData.msg)
            io.emit('getmsgo', {target: socket.id, msgData, date: Date.now()})
        })
        /**
         * 群聊消息*/
        //加入群聊
        socket.on('join', (joinData) => {
            let name = joinData.name
            let img = joinData.img
            socket.name = name;
            socketList[name] = socket.id;
            let user = {name: name, img: img, id: socket.id, tip: false ,uid:joinData.uid};
            // console.log(user)
            // console.log(users)
            let falg = true
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == socket.id) falg = false
            }
            if (falg) users.push(user);
            io.emit('welcome', users);
        });
        //手动退出群提醒
        socket.on('quit', data => {
            if (socketList.hasOwnProperty(socket.name)) {
                //删除
                delete socketList[socket.name];
                for (let i = 0; i < users.length; i++) {
                    if (users[i].name == socket.name) {
                        users.splice(i, 1);
                        // io.emit('disconnects', users, socket.name);
                        io.emit('disconnects', users);
                    }
                }
                io.emit('quit', data.name)
            }
        })
        //断开连接提示
        socket.on('disconnect', () => {
            console.log('断开链接' + socket.id)
            if (socketList.hasOwnProperty(socket.name)) {
                //删除
                delete socketList[socket.name];
                for (let i = 0; i < users.length; i++) {
                    if (users[i].name == socket.name) {
                        users.splice(i, 1);
                        io.emit('disconnects', users);
                    }
                }
                //广播有用户退出
                io.emit('quit', socket.name);
            }

        })
       /** 单聊功能*/
        //一对一消息
        socket.on('msgoto',data => {
            //广播
            socket.to(data.tid).emit('sMsg',data);
        })


    })
}
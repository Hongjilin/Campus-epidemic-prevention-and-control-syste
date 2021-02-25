
const  tools=require('../utils/tools')

module.exports=class users_mod extends require('./model'){
    /**
     * 数据库登录
     * @param username
     * @param password
     * @param type
     * @returns {Promise<any>}
     * @constructor
     */
    static  LoginUser(username,password,type){
        type=Number(type)
        return new Promise((resolve ,reject)=>{
            let sql="select * from user where binary username='"+username+"' and password='"+password+"' and type= "+type
            console.log(sql)
            this.query(sql).then(result=>{
                resolve(result)
            }).catch(err=>{
               reject('登录失败')
            })

        })
    }

    /**
     * 根据id登录
     * @param id
     * @param password
     * @param type
     * @constructor
     */
    static LoginUserByid(id,password,type){
        type=Number(type)
        return new Promise((resolve ,reject)=>{
            let sql="select * from user where binary id='"+id+"' and password='"+password+"' and type= "+type
            console.log(sql)
            this.query(sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject('登录失败')
            })
        })
}
    /**
     * 根据用户类型进行用户信息获取(分页获取总数量与数据)
     * @param type
     * @param currPage
     * @param pageNum
     */
    static  getUsersByTypePageMod(type,currPage,pageNum){
        pageNum=Number(pageNum);
        currPage=Number(currPage);
        currPage=Number(currPage*pageNum)
        return new Promise((resolve , reject)=>{
            let sql = 'select * from user where type = '+ type+' order by modifytime desc LIMIT ?,?'
            this.query(sql,this.formatParams(currPage,pageNum)).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    /**
     * 获取所有用户信息
     */
    static  getAllUserX(){
        return new Promise((resolve , reject)=>{
            let sql = 'select * from user '
            this.query(sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    /**
     * 将redis数据未重复的进行插入
     * @param inXlsxArr
     */
    static inXlsxData(inXlsxArr){
    return new Promise((resolve, reject)=>{
        for (let i=0;i<inXlsxArr.length;i++){
            let sql="insert into user (id,username,password,head,address,sex,classes,type) values("+inXlsxArr[i].id+", '"+inXlsxArr[i].username+"' , '"+inXlsxArr[i].password+"', '"+inXlsxArr[i].head+"',"+
                "'"+inXlsxArr[i].address+"', '"+inXlsxArr[i].sex+"', '"+inXlsxArr[i].classes+"', '"+inXlsxArr[i].type+"')"
            this.query(sql).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        }
    })
    }
    static  getUsersByTypePageTotal(type){
        return new Promise((resolve , reject)=>{
            let sql = "select count(1) as count from user where type = "+type
            this.query(sql).then(result=>{
                    resolve(result)
                }).catch(err=>{
                    reject(err)
            })
        })
    }

    /**
     * 删除用户表用户
     * @param id
     */
    static delUserdataMod(id){
        return new Promise((resolve,reject)=>{
        let sql= "delete from user where id = "+id
            console.log(sql)
            this.query(sql).then(result=>{
                resolve("删除用户表用户成功")
            }).catch(err=>{
                reject("删除用户表用户失败")
            })
        })
    }
    /**
     * 删除阅读表用户
     * @param id
     */
    static delRead(id){
        return new Promise((resolve,reject)=>{
        let sql= "delete from `read` where u_id = "+id
            console.log(sql)
            this.query(sql).then(result=>{
                resolve(".删除阅读表用户成功")
            }).catch(err=>{
                reject(",删除阅读表用户失败")
            })
        })
    }

    /**
     * 管理员进行用户信息修改
     * @param u_id
     * @param username
     * @param sex
     * @param address
     * @param type
     */
    static  upUserdataMod(u_id,username,sex,address,type){
        let currTime= tools.getDate19()
        return new Promise((resolve, reject)=>{
            let sql ="update `user` set username= '"+username+"', sex='"+sex+"' , address='"+address+"', type ="+type+" , modifytime= '"+currTime+"' where id="+u_id
            console.log(sql)
            this.query(sql).then(result=>{
                resolve("更新成功")
            }).catch(err=>{
                reject("可能是因为网络不好,更新失败")
            })

        })
    }

    /**
     *修改个人密码
     * @param u_id
     * @param oldpassword
     * @param newpassword
     */
    static upPwdMod(u_id,oldpassword,newpassword){
        return new Promise((resolve, reject)=>{
            let sql='update `user` set password = ? where password = ? and id = ?'
            this.query(sql,this.formatParams(newpassword,oldpassword,u_id)).then(result=>{
                resolve(result)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    /**
     * 修改个人头像
     * @param head_imgUrl
     * @param u_id
     */
    static upUserHeadMod(head_imgUrl,u_id){
        return new Promise((resolve, reject)=>{
            let sql="update `user` set head= '"+head_imgUrl+"' where id = "+u_id
        this.query(sql).then(result=>{
            resolve("上传成功")
        }).catch(err=>{
            reject(err)
        })
     })
    }



}
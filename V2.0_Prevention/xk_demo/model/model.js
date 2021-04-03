const  mysql=require('mysql')

const  pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'vue_store'

})
/**
 * 封装一个数据库模型基类
 * @type {module.Model}
 */
module.exports=class  Model {
    /**
     * 通用的查询方法
     * @param sql 要执行的sql语句
     * @param params  给sql语句的占位符进行赋值的参数数组
     */
    static  query(sql,params){
        return new Promise((resolve ,reject)=>{
            pool.getConnection(function (err,connection) {
                if (err){
                    console.error(err)
                    connection.release()
                }else{
                    //query执行sql语句
                    connection.query(sql, params,(err,results)=>{
                        if (err){
                            console.error(err)
                            reject(err)
                        }else{
                            resolve(results)
                        }
                        //结束会话,释放连接
                        connection.release()
                    })
                }
                
            })
        })
    }
    static formatParams(){
        let array=[]
        for (let i=0,l=arguments.length;i<l;i++){
            array.push(arguments[i]);
        }
        return array
    }

    static  getNowAndLastDate(){
        let date= new Date();
        let Month =""
        if ((date.getMonth()+1)<10)   Month="0"+String((date.getMonth()+1))
        else Month=(date.getMonth()+1)+""
        let now=date.getDate()
        let lastnow=date.getDate()
        if(date.getDate()<10) now="0"+date.getDate()
        if(date.getDate()<9) lastnow="0"+(date.getDate()+1)
        let newDate= ""+date.getFullYear()+Month+now
        let lastDate=""+date.getFullYear()+Month+lastnow
        let nowMonth=""+date.getFullYear()+Month+"01"
        let lastMonth=""+date.getFullYear()+Month+"31"

        return {newDate,lastDate,nowMonth,lastMonth}

    }

    
}

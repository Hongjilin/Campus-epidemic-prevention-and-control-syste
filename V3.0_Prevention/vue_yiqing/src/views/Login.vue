<template>
    <div class="box">
        <!-- <img src="../assets/2.png" alt="" > -->
    <div class="login_contain">
        
        <span class="title">校园疫情管理系统</span>
        <el-form ref="form" :model="form" >
            <el-form-item >
                <el-input v-model="form.name" placeholder="学号"  prefix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input v-model="form.password" placeholder="密码" prefix-icon="el-icon-date" type="password"></el-input>
            </el-form-item>
             <el-form-item class="btn">
                <el-button type="primary" @click="onSubmit">登录</el-button>
                
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
import {login} from '@/api/user.js'
export default {
    data() {
        return {
            form:{
                name:'201307080',
                password:'123'
            }
        }
    },
    
    methods: {
        async onSubmit(){
             const res = await login({id:this.form.name,password:this.form.password})
            console.log(res);
            if(res.message=="学号不存在") {
                // this.form.name=""
                // this.form.password=""
                return this.$message.error('请输入正确学号')
                
            }
            else if(res.message=="密码错误"){
                // this.form.name=""
                // this.form.password=""
             return this.$message.error('请输入正确密码')
            }else if(res.res.type==1){
                
                window.sessionStorage.setItem("token",res.result.token)
                this.$router.push('/admin')
            }
           else if(res.res.type==2){
                 
                 window.sessionStorage.setItem("token",res.result.token)
                 this.$router.push('/student')
            }
            else if(res.res.type==3){
                
                window.sessionStorage.setItem("token",res.result.token)
                this.$router.push('/teacher')
            }
         }
                
            
    },
}
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
    }
}
.title{
    text-align: center;
    display: block;
    font-size: 20px;
    color: black;
    margin-bottom: 20px;
}
.login_contain{
    width: 400px;
    height: 300px;
    border: 1px solid #ccc;
    padding: 20px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.el-button {
    margin-left: 70px;
    width:200px ;
}
</style>
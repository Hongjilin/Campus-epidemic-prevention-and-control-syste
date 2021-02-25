<template>

    <div style="width: 25%;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);">
        <transition name="el-fade-in-linear">
            <el-card class="box-card" shadow="hover" style="text-align: center"    @keyup.enter.native="login" >
                <div slot="header" class="clearfix" style="text-align: center">
                    <h2 style="font-size: 1rem">校园疫情管理系统</h2>
                </div>
                <el-input prefix-icon="el-icon-user-solid" v-model="input_user" placeholder="请输入用户名" class="inp"></el-input>
                <div style="height: 1.3rem"></div>
                <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="input_pwd" show-password class="inp" ></el-input>
                <el-radio-group v-model="radio3" size="small" style="display: flex;justify-content: space-around;margin-top: 1.3rem;">
                    <el-radio label="1" border>管理员</el-radio>
                    <el-radio label="2" border>学生</el-radio>
                    <el-radio label="3" border>教师</el-radio>
                </el-radio-group>
                <el-button type="primary" class="button" size="small"@click="login">登录</el-button>
            </el-card>
        </transition>
    </div>

</template>
<script>
export default {
    name:'Login',
    data() {
    return {
        input_user: '',
        input_pwd:'',
        radio3: "1",
    }
  },
  methods:{
      /**
       * 登录
       * 用户名：username:this.input_user,
       * 密码：password:this.input_pwd,
       */
      login(){
        if(!this.input_user || !this.input_pwd) {
            this.open3("用户名、密码不能为空")
            this.input_pwd = ''
        }else {
            this.$axioslog({
                url:'/users/login',
                method:'post',
                data:{
                    username:this.input_user,
                    password:this.input_pwd,
                    type:this.radio3
                },
                success:(result)=> {
                    if(result=="用户名或者账号输入错误"){
                        this.$message.error('用户名或者账号输入错误');
                        this.input_pwd = ''
                    }else
                    {
                        window.localStorage.setItem("token",result.jwt_token);
                        //方便后来使用
                        window.localStorage.setItem("id",result.UserloginData[0].id);
                        window.localStorage.setItem("name",result.UserloginData[0].username);
                        window.localStorage.setItem("img",result.UserloginData[0].head);
                        window.localStorage.setItem("u_id",result.UserloginData[0].id);
                        if(this.radio3==1){
                            window.location.href = "http://localhost:80/#/admin/home";
                        }
                        if(this.radio3==2){
                            window.location.href = "http://localhost:80/#/student/home";
                        }
                        if(this.radio3==3){
                            window.location.href = "http://localhost:80/#/teacher/home";
                        }
                    }
                }
            })
        }
    },
      open3(v) {
          this.$message({
              message:v,
              type: 'warning'
          });
      },
  }
}
</script>
<style lang="scss" scoped>
    .login{
        h3{
            text-align: center;
            height: 60px;
            line-height: 20px;
            border-bottom: 1px solid rgb(170, 170, 170);
            color: rgb(92, 92, 92);
        }
            .inp{
            margin-top: 10px;
        }
        .button{
            margin-top: 20px;
            position: fixed;left:50%;transform: translateX(-50%);
        }
    }
</style>
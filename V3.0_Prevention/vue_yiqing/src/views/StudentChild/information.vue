<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <div @click="open" class="update">修改资料</div>
    </el-breadcrumb>


    <!--  -->
      <el-card>
        <el-form :ref="information" :model="information" label-width="80px">
          <el-form-item label="学号">
            <el-input v-model="information.id" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="information.username" style="width:30%" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码">
            <el-input v-model="information.password" style="width:30%" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="邮箱">
            <el-input v-model="information.mailbox" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item label="家庭地址">
            <el-input v-model="information.address" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="information.sex" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="information.classes" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="information.college" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="information.grade" style="width:30%" disabled></el-input>
          </el-form-item>
          <el-form-item>
        </el-form-item>
        </el-form>
      </el-card>


      <!-- 修改资料框 -->
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <span>
    <!-- 内容主体区域 -->
    <el-form :ref="update" :model="update" label-width="80px">
          <el-form-item label="新密码">
            <el-input v-model="update.newa" type="password" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="update.confirm"  type="password"></el-input>
          </el-form-item>
          
    </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import {getUserData,upPwd} from '../../api/user'
export default {
data () {
    return {
      information:{
        id:'',
        username:'',
        password:'',
        mailbox:'',
        address:'',
        sex:'',
        classes:'',
        college:'',
        grade:''
      },
      update:{
        newa:'',
        confirm:''
      },
      dialogVisible:false
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    open(){
      this.dialogVisible=true

    },
    async submit(){
      const {newa,confirm} =this.update
      if(newa!==confirm){
        return this.$message.error('两次密码输入不一致')
      }else if(newa=="") return this.$message.error('密码不能为空')
      else{
            const res=await upPwd({password:newa})
            console.log(res);
            this.update.newa=""
            this.update.confirm=""
            this.dialogVisible=false
            return this.$message.success('修改密码成功')
      }
      
    },
    async getUserData(){
          const res =await getUserData()
          this.information=res
    }
  },
}
</script>

<style lang="less" scoped>
.update:hover{
  color: greenyellow;
  cursor: pointer;
}

.el-breadcrumb{
  margin-bottom: 20px;
}
</style>
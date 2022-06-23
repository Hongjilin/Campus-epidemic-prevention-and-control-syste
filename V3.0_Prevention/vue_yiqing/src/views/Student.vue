<template>
  
    
    <home>
      <!-- 左边导航栏 -->
      <template slot="left">
        <el-col :span="12">
    
    <el-menu 
      default-active="2"
      class="el-menu-vertical-demo"
      
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      
       
      <el-menu-item index="information" @click="$router.push('/student/information')">
        <i class="el-icon-menu"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="headlth"  @click="$router.push('/student/headlth')">
        <i class="el-icon-document"></i>
        <span slot="title">健康填报</span>
      </el-menu-item>
      <el-menu-item index="Travel" @click="$router.push('/student/travel')">
        <i class="el-icon-setting"></i>
        <span slot="title">行程管理</span>
      </el-menu-item>
      <el-menu-item index="Leave" @click="$router.push('/student/leave')">
        <i class="el-icon-setting"></i>
        <span slot="title">请假申请</span>
      </el-menu-item>
      <el-menu-item index="update" @click="$router.push('/student/notice')">
        <i class="el-icon-setting"></i>
        <span slot="title">通知</span>
      </el-menu-item>
      <el-menu-item index="home" @click="$router.push('/student/home')">
        <i class="el-icon-menu"></i>
        <span slot="title">群聊</span>
      </el-menu-item>
    </el-menu>
  </el-col>
      </template>
      <template slot="main">
        
        <router-view></router-view>
      </template>
    </home>
  
</template>

<script>
import Home from '../components/Home.vue'


export default {
  components: {  Home },
  methods: {
    // aa(){
    //  this.$router.push('/student/home')
    // },
    // bb(){
    //  this.$router.push('/student/information')
    // }
  },
}
</script>

<style lang="less" scoped>

</style>
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
     
       
      <el-menu-item index="information" @click="$router.push('/admin/information')">
        <i class="el-icon-menu"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="headlth"  @click="$router.push('/admin/headlth')">
        <i class="el-icon-document"></i>
        <span slot="title">健康填报管理</span>
      </el-menu-item>
      <el-menu-item index="usermanage" @click="$router.push('/admin/usermanage')">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="Leave" @click="$router.push('/admin/leave')">
        <i class="el-icon-setting"></i>
        <span slot="title">校园群聊</span>
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
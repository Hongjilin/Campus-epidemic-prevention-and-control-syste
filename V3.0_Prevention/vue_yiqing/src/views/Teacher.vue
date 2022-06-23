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
      <el-menu-item index="home" @click="$router.push('/teacher')">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       
      <el-menu-item index="1" @click="$router.push('/teacher/gerenzhongren')">
        <i class="el-icon-menu"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="2"  @click="$router.push('/teacher/allhealthy')">
        <i class="el-icon-document"></i>
        <span slot="title">健康填报管理</span>
      </el-menu-item>
      <el-menu-item index="Travel" @click="$router.push('/teacher/allLeave')">
        <i class="el-icon-setting"></i>
        <span slot="title">请假管理</span>
      </el-menu-item>
      <el-menu-item index="Leave" @click="$router.push('/teacher/allTravel')">
        <i class="el-icon-setting"></i>
        <span slot="title">行程管理</span>
      </el-menu-item>
      <el-menu-item index="update" @click="$router.push('/teacher/chat')">
        <i class="el-icon-setting"></i>
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
  components: { Home },

}
</script>

<style lang="less" scoped>

</style>
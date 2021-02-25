<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="群消息" name="first">
        <sendTotalGroup></sendTotalGroup>
    </el-tab-pane>
    <el-tab-pane label="班群消息" name="second">

    </el-tab-pane>
    <el-tab-pane label="私人消息" name="third">
        
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components:{
        sendTotalGroup:() => import('@/components/sendTotalGroup.vue')
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
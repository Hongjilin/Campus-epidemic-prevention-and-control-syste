<template>
  <el-button type="info" @click="aa">导出excel</el-button>
</template>

<script>

export default {
  props:['downData'],
  data() {
    return {
      
    }
  },methods: {
      aa(){
        console.log(this.downData);
      }
  },
}
</script>

<style lang="less" scoped>


</style>
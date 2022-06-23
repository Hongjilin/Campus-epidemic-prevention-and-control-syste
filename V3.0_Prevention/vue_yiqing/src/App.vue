<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>


<script>

import {getUserData} from './api/user'
export default {
  data() {
    return {
      
    }
  },
  created() {
    this.receive()
  },
  methods: {
     async receive(){
            const res = await getUserData()
            console.log(res.id);
            let webs=null;
             webs = new WebSocket('ws://localhost:3131/koa/ws?id=' + res.id)
             webs.onopen = function() {
                console.log('连接成功')
              
            }
            // 接收服务器发送的信息
            let that=this
        webs.onmessage = function(evt) {
          
            if(evt.data!=='连接成功'){
                let data=JSON.parse(evt.data).content
                  that.$notify({
                title: '警告',
                message: data,
                type: 'warning',
                duration: 0
              });
            }
        }
  },
  }
}
</script>




<style lang="less">
#app {
  
}



</style>

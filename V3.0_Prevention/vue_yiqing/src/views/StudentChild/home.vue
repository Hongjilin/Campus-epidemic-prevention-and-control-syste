<template>
  <div>
    <chat></chat>
  </div>
</template>

<script>
import chat from "../../components/chat.vue"

export default {
  components: { chat },
  data() {
    return {
      
    }
  },
 watch: {
   $route(){
     alert('改变了')
   }
},
methods: {
 getPath(){
    console.log(1111)
  }
},
}
</script>

<style>

</style>
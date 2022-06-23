import Vue from 'vue'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/base.css"
Vue.prototype.$host = 'http://localhost:3000/'
Vue.prototype.host = location.host.split(':')[0]
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
Vue.prototype.$hostTemp = 'http://192.168.31.94:3000'
Vue.prototype.$notify = Notification;
Vue.config.productionTip = false

Vue.use(ElementUi);





// 封装一个函数,格式化时间为yyyy-MM-dd格式,挂在到全局
Vue.prototype.$formart = function(fmt) {
    var date = new Date(fmt);
    var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    return date_value
}



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
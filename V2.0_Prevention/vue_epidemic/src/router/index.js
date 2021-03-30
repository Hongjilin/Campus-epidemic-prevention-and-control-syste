import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {path:'*',redirect:'/'},
    {path:'/',name: 'Login',component: () => import('@/components/menu/Login.vue')},
    //管理员界面
    {path:'/admin',component:() => import('@/components/menu/Admin.vue'),
        children:[
            {path:'student', component:() => import('@/components/main/studentAdmin.vue')},
            {path:'teacher', component:() => import('@/components/main/teacherAdmin.vue')},
            {path:'home', component:() => import('@/components/homepage/homepage.vue')},
            {path:'noticeSend', component:() => import('@/components/main/noticeSend.vue')},
            {path:'otp', component:() => import('@/components/socket/otp_socket.vue')},
            {path:'oto',  component:() => import('@/components/socket/otp_socket.vue')},
            {path:'add', component:() => import('@/components/main/addclass.vue')},
          ]},
    {path:'/student',name:'Student',component:() => import('@/components/menu/Student.vue'),
        children:[
            {path:'home',component:() => import('@/components/homepage/homepage.vue')},
            {path:'myNotice',component:() => import('@/components/main/myNotice.vue')},
            {path:'health',component:() => import('@/components/main/healthTable.vue')},
            {path:'application', component:() => import('@/components/main/application.vue')},
            {path:'user',component:() => import('@/components/main/user.vue')},
            {path:'otp', component:() => import('@/components/socket/otp_socket.vue')},
            {path:'oto',  component:() => import('@/components/socket/otp_socket.vue')},
          ]},
    {path:'/teacher',name:'Teacher',component:() => import('@/components/menu/Teacher.vue'),
        children:[
            {path:'home',component:() => import('@/components/homepage/homepage.vue')},
            {path:'notice',component:() => import('@/components/main/noticeSend.vue')},
            {path:'leave',component:() => import('@/components/main/leave.vue')},
            {path:'user',component:() => import('@/components/main/user.vue')},
            {path:'otp', component:() => import('@/components/socket/otp_socket.vue')},
            {path:'oto',  component:() => import('@/components/socket/otp_socket.vue')},
          ]},
]

const router = new VueRouter({
  routes
})

export default router

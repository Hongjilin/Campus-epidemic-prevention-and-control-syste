import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
// 管理员子路由
import AdminLeave from '../views/AdminChild/adminLeave.vue'
import Adminhealthy from '../views/AdminChild/adminhealthy.vue'
import Adminxinxi from '../views/AdminChild/adminxinxi.vue'
import Adminxingcheng from '../views/AdminChild/adminxingcheng.vue'
import AdminUsermanage from '../views/AdminChild/adminUsermanage.vue'
import Teacher from '../views/Teacher.vue'
// 教师子路由
import Allhealthy from '../views/TeacherChild/allhealthy.vue'
import AllLeave from '../views/TeacherChild/allLeave.vue'
import Gerenzhongren from '../views/TeacherChild/gerenzhongxin.vue'
import AllTravel from '../views/TeacherChild/allTravel.vue'
import TeacherChat from '../views/TeacherChild/Teacherchat.vue'


import Student from '../views/Student.vue'
//学生子路由
import Information from '../views/StudentChild/information.vue'
import Home from '../views/StudentChild/home.vue'
import Headlth from '../views/StudentChild/headlth.vue'
import Leave from '../views/StudentChild/leave.vue'
import Notice from '../views/StudentChild/notice.vue'


import Travel from '../views/StudentChild/travel.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        component: Login
    },

    {
        path: '/admin',
        component: Admin,
        meta: '/admin',
        children: [{
            path: 'leave',
            component: AdminLeave
        }, {
            path: 'headlth',
            component: Adminhealthy
        }, {
            path: 'travel',
            component: Adminxingcheng
        }, {
            path: 'information',
            component: Adminxinxi
        }, {
            path: 'usermanage',
            component: AdminUsermanage
        }]
    },
    {
        path: '/teacher',
        component: Teacher,
        children: [{
                path: 'home',
                component: Home
            }, {
                path: 'allhealthy',
                component: Allhealthy
            }, {
                path: 'allLeave',
                component: AllLeave
            }, {
                path: 'gerenzhongren',
                component: Gerenzhongren
            }, {
                path: 'allTravel',
                component: AllTravel
            }, {
                path: 'chat',
                component: TeacherChat
            }

        ]
    },
    {
        path: '/student',
        component: Student,
        meta: "student",
        children: [{
                path: 'home',
                component: Home
            }, {
                path: 'information',
                component: Information
            }, {
                path: 'headlth',
                component: Headlth
            }, {
                path: 'travel',
                component: Travel
            }, {
                path: 'leave',
                component: Leave
            }, {
                path: 'notice',
                component: Notice,

            }

        ]
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {

    if (to.path == "/login") return next()
    const tokenStr = window.sessionStorage.getItem("token")
    if (from.path.includes('/student') && !to.path.includes('/student')) {
        window.sessionStorage.removeItem('token')
        return next('/login')
    }
    if (from.path.includes('/admin') && !to.path.includes('/admin')) {
        window.sessionStorage.removeItem('token')
        return next('/login')
    }
    if (from.path.includes('/teacher') && !to.path.includes('/teacher')) {
        window.sessionStorage.removeItem('token')
        return next('/login')
    }
    if (!tokenStr) {

        return next('/login')
    }

    next()
})
export default router
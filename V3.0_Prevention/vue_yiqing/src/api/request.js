// 封装通用网络请求
// 安装axios $ npm i axios -s
import axios from "axios";
// import {Notify,Toast} from 'vant';  // ⚪️ 1-1 消息提示组件
import router from "@/router";

export function request(config) {
    const instance = axios.create({
        baseURL: "http://localhost:3000/", // 根路径，网关统一入口路径
        // timeout: 5000, // 请求超时时间，请求达到5秒，不让请求
    });

    // 请求拦截
    instance.interceptors.request.use(
        (config) => {
            // 如果有一个接口需要认证才可以访问，就在这里统一设置

            // 使用 JWT 认证: 取出用户登录时存的 token 放到请求头
            const token = window.sessionStorage.getItem("token");

            if (token) {
                // 如果token存在
                // Authorization: Bearer Token ; key : value
                // 在headers头部加上Authorization属性，把token带到服务器里面
                config.headers.Authorization = "Bearer " + token;
                // Bearer 右边有一个空格

            }
            // 放行
            return config;
        },
        (error) => {
            // 什么也不要做
        }
    );

    // 响应拦截
    instance.interceptors.response.use(
        (res) => {
            // console.log(res) // 这里可以打印所有的数据
            return res.data ? res.data : res; // 封装获取数据 data 路径
        },
        (err) => {
            // 如果有需要授权才可以访问的接口，统一去 login 授权
            // if (err.response.status === 401) {
            //     // Toast.fail('请您先登录！')
            //     router.push({ path: "/login" });
            // }
            // 如果后端接口有错误提示消息，这里统一处理,显示错误信息
            // console.log(err)
            // 通过err.response响应数据里面的错误，拿到Object键里面的错误信息
            // Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
        }
    );

    return instance(config);
}
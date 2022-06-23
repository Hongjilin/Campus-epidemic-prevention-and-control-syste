import { request } from "./request";


// 用户登录
export function login(data) {
    return request({
        url: "/user/login",
        method: "POST",
        data,
    });
}


// 用户密码修改
export function upPwd(data) {
    return request({
        url: "/user/upPwd",
        method: "POST",
        data,
    });
}

// 用户信息获取
export function getUserData() {
    return request({
        url: "/user/getUserDataByToken",
        method: "GET",

    });
}


// 用户信息分页
export function getUsersByTypePage(type, pageNum, currPage) {
    return request({
        url: `/admin/getUsersByTypePage?pageNum=3&currPage=1&type=2`,
        method: "GET",

    });
}

export function getUsersHealthy() {
    return request({
        url: "/admin/daochu",
        method: "POST",

    });
}

// 修改审批状态
export function upLeave() {
    return request({
        url: "/teacher/upLeaveState?id=1&state=4",
        method: "GET",

    });
}


// 用户头像修改
export function upicon() {
    return request({
        url: "/user/upicon",
        method: "POST",

    });
}

// 获取今日发烧总数/user/gorisk
export function getUserfever(params) {
    return request({
        url: "/user/getUserfever",
        method: "GET",
        params
    });
}

// 获取14天经过高危地区人数
export function gorisk(params) {
    return request({
        url: "/user/gorisk",
        method: "GET",
        params
    });
}
// 今日填报人数
export function getfill(params) {
    return request({
        url: "/user/getfill",
        method: "GET",
        params
    });
}
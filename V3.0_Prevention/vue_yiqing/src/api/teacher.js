import { request } from "./request";


// 获取学生健康表
export function getHealthy(data) {
    return request({
        url: "/teacher/getHealthy",
        method: "GET",
        params: data,
    });
}

// 获取学生请假表
export function getLeave(data) {
    return request({
        url: "/teacher/getLeave",
        method: "GET",
        params: data,
    });
}

// 学生请假审批状态修改
export function upLeaveState(data) {
    return request({
        url: "/teacher/upLeaveState",
        method: "GET",
        params: data,
    });
}

// 查询行程数据(按条件)
export function allTeavel(data) {
    return request({
        url: "/teacher/allTeavel",
        method: "post",
        data,
    });
}

// 未打卡学生数据
export function notClock(data) {
    return request({
        url: "/teacher/notClock",
        method: "post",
        data,
    });
}
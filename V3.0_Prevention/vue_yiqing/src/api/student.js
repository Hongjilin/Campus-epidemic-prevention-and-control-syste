import { request } from "./request";

// 获取学生请假表
export function getmyLeave() {
    return request({
        url: "/student/getmyLeave",
        method: "POST",

    });
}
// 提交当天填报表
export function sethealth(data) {
    return request({
        url: "/student/sethealth",
        method: "POST",
        data
    });
}


// 提交请假单
export function setLeave(data) {
    return request({
        url: "/student/setLeave",
        method: "POST",
        data
    });
}


// 判断当天有没有提交请假单
export function gethealth(params) {
    return request({
        url: "/student/gethealth",
        method: "GET",
        params
    });
}


// 提交行程数据
export function subTravel(data) {
    return request({
        url: '/student/subTravel',
        method: 'post',
        data
    })
}

// 查询行程数据
export function findTravel(data) {
    return request({
        url: '/student/findTravel',
        method: 'post',
        data
    })
}
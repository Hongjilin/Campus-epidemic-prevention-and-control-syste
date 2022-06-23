import { request } from "./request";

// 获取学生请假表
export function getallhealthy(data) {
    return request({
        url: "/admin/getallhealthy",
        method: "get",
        params: data
    });
}


// excel健康表导入
export function upload(data) {
    return request({
        url: "/admin/upload",
        method: "post",
        data
    });
}
// excel用户表导入
export function uploadUser(data) {
    return request({
        url: "/admin/uploadUser",
        method: "post",
        data
    });
}

// 查询所有用户
export function findUser(data) {
    return request({
        url: "/admin/findUser",
        method: "post",
        data
    });
}
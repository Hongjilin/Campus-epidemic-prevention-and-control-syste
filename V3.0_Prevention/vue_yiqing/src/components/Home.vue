<template>
  <div style="height:100%">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="left">
          <div class="head" @click="headicon">
            <img :src="$host + userData.head" alt="" />
          </div>
          <span class="uname">{{ userData.username }}</span>
        </div>
        <span class="center">校园疫情管理系统</span>
        <div class="right">
          <span>{{
            userData.type == 1 ? "管理员" : userData.type == 2 ? "学生" : "教师"
          }}</span>
          <el-button type="info" round @click="exit">退出</el-button>
        </div>
      </el-header>

      <el-container height="100%">
        <el-aside width="200px" >
          <slot name="left">left</slot>
        </el-aside>
        <el-main>
          <slot name="main">
            <!-- 三端公有的页面组件 -->
            <public></public>
          </slot>
        </el-main>
      </el-container>
    </el-container>

    <!-- 头像修改区域 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-upload
          class="avatar-uploader"
          :action="`http://${host}:3000/user/upicon`"
          :show-file-list="false"
          :headers="setHeaders"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>

import xlsx from "xlsx";
import { getUserData, upicon } from "../api/user.js";
import Public from "./public.vue";
const test = {
  电话: "tel",
  姓名: "name",
  学号: "no",
};
export default {
  components: { Public },
  data() {
    return {
      imageUrl: "",
      setHeaders: {
        Authorization: "Bearer " + window.sessionStorage.getItem("token"),
      },
      form: {
        type: 2,
        pageNum: 3,
        currPage: 1,
      },
      userData: {
        username: "",
        head: "",
        type: "",
      },
      dialogVisible: false,
      icon: {
        name: "",
      },
    };
  },
  created() {
    // 渲染页面
    this.getUser();
    this.upicon();
    
  },
  methods: {
    // readFile(file) {
    //   return new Promise((resolve) => {
    //     let reader = new FileReader();
    //     reader.readAsBinaryString(file);
    //     reader.onload = (ev) => {
    //       resolve(ev.target.result);
    //     };
    //   });
    // },
    // async onChange(file) {
    //   let dataBinary = await this.readFile(file.raw);
    //   let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
    //   let workSheet = workBook.Sheets[workBook.SheetNames[0]];
    //   const data = xlsx.utils.sheet_to_json(workSheet);
    //   const temp = [];
    //   data.map((item) => {
    //     const tempItem = {};
        
    //     Object.keys(item).map((key) => {
    //       tempItem[test[key]] =item[key] ;
    //     });
    //     temp.push(tempItem)
    //   });

    //   console.log(temp,'temptemptemptemp');
    // },
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      await this.getUser();
      this.upicon();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeUpload(file) {
      const isJPG = file.type === "jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取用户头像和名称
    async getUser() {
      const res = await getUserData();
      this.userData.username = res.username;
      this.userData.head = res.head;
      this.userData.type = res.type;
      this.$store.commit('getimg',res.head)
      this.$store.commit('getuname',res.username)
      
    },
    // 退出到登录页
    exit() {
      window.sessionStorage.removeItem('token')
      this.$router.push("/login");
    },

    // 用户头像修改
    async upicon() {
      const res = await upicon();
      
    },

    headicon() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #409eff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    .head {
      width: 50px;
      height: 50px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    span {
      display: flex;
      align-items: center;
      font-size: 20px;
      margin-left: 5px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
</style>
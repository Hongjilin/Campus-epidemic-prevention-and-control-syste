<template>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <span>
     <el-upload
          class="avatar-uploader"
          :action="`${$hostTemp}/student/uploadZP/${id}`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    data() {
        return {
             dialogVisible: false,
             id:'',
             imageUrl:''
        }
    },
    methods: {
         open(val){
            this. dialogVisible=true
            this.id=val
        },
        sure(){
      this.$emit('changeZP')
      this.dialogVisible=false
    },
          async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    },
}
</script>

<style lang="less" scoped>

</style>
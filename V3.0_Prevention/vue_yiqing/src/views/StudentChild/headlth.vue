<template>
  <div v-loading="loading">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>每日健康打开</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 打开按钮 -->
    <el-button
      type="primary"
      class="add"
      @click="submit"
      id="btn"
      :disabled="isdaka"
      >打卡</el-button
    >
      <div class="success" v-if="isdaka">
        <!-- <img src="../../assets/image/success.jpg" alt=""> -->
      </div>
    <!-- 卡片视图 -->
    <el-card >
      
      <el-form ref="form" :model="form"   >
        <el-form-item label="体温:" >
          <el-input v-model="form.temperature" placeholder="请输入体温" oninput="value=value.replace(/[^0-9.]/g,'')" style="width:200px" :disabled="isdaka"></el-input>
        </el-form-item>
        <el-form-item label="" disabled>
          <span>是否发烧:</span>
          <el-radio v-model="form.hot" label="是" :disabled="isdaka">是</el-radio>
          <el-radio v-model="form.hot" label="否" :disabled="isdaka">否</el-radio>
        </el-form-item>
        <el-form-item label="">
          <span>14天内是否经过高危地区:</span>
          <el-radio v-model="form.gohighrisk" label="是" :disabled="isdaka">是</el-radio>
          <el-radio v-model="form.gohighrisk" label="否" :disabled="isdaka">否</el-radio>
        </el-form-item>
        <el-form-item label="">
          <span>是否做过核酸检测:</span>
          <!-- <el-input v-model="form.ishesuan"></el-input> -->
          <el-radio v-model="form.ishesuan" label="是" :disabled="isdaka">是</el-radio>
          <el-radio v-model="form.ishesuan" label="否" :disabled="isdaka">否</el-radio>
        </el-form-item>
        <el-form-item label="当前所在市区:" >
          <el-input v-model="form.address" placeholder="如漳州"  style="width:200px" :disabled="isdaka"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    
  </div>
</template>

<script>
import { gethealth, sethealth } from "../../api/student";
export default {
  data() {
    return {
      loading: false,
      // 打卡表单
      form: {
        temperature: "",
        hot: "",
        gohighrisk: "",
        ishesuan: "",
        filldata: "",
        address:""
      },
      isdaka: false,
    };
  },
  created() {
    this.gethealth();
  },
  methods: {
    // 获取表单信息
    async gethealth() {
      const nowdata = this.$formart(new Date());
      const { res } = await gethealth({ nowdata });

      if (!res) return;
      else {
        this.isdaka = true;
        this.form = res;
      }
    },

    // 提交打卡信息
    async submit() {
      this.loading = true;
      const filldata = this.$formart(new Date());
      await sethealth({ ...this.form, filldata });
      await this.gethealth();
      this.loading = false;
      this.$message.success("打卡成功");
    },
  },
};
</script>

<style lang="less" scoped>
  .success{
    position: absolute;
    margin: auto;
    top: 50;
    left: 0;
    bottom: 100px;
    right: 0;

    width: 300px;
    height: 400px;
    
  }
.add {
  float: right;
  margin: 0 20px 10px 20px;
}
.el-card {
  width: 50%;
  margin-left: 0 auto;
}
</style>
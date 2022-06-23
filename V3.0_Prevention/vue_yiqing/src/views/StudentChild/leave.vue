<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假申请</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  -->
    <el-button type="primary" @click="dialogVisible = true" class="add"
      >+</el-button
    >

    <!-- 表格 -->
    <el-table :data="getLeaveData" border style="width: 100%">
      <el-table-column prop="u_id" label="学号" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="reason" label="事由"> </el-table-column>
      <el-table-column prop="startime" label="请假时间"> </el-table-column>
      <el-table-column prop="endtime" label="回来时间"> </el-table-column>
      <el-table-column prop="state" label="审批状态">
        <template slot-scope="scope">
        <span> </span> 
        <el-button :type="scope.row.state==0?'info':(scope.row.state==1?'danger':'success')">{{   renderStatus(scope.row) }}</el-button>
          <!-- <span v-if="scope.row.state==0">未审批</span>
         <span v-else-if="scope.row.state==1">不通过</span>
         <span v-else>通过</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="classes" label="班级"> </el-table-column>
    </el-table>

    <!-- 请假表单 -->
    <el-dialog title="请假单" :visible.sync="dialogVisible" width="50%">
      <span>
        <!-- 请假单里的信息 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="请假原因">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-select v-model="form.college" placeholder="请选择所属学院">
              <el-option label="数计学院" value="数计学院"></el-option>
              <el-option label="小学教育" value="小学教育"></el-option>
              <el-option label="音舞学院" value="音舞学院"></el-option>
              <el-option label="体育学院" value="体育学院"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级">
            <el-select v-model="form.grade" placeholder="请选择年级">
              <el-option label="19级" value="19级"></el-option>
              <el-option label="20级" value="20级"></el-option>
              <el-option label="21级" value="21级"></el-option>
              <el-option label="22级" value="22级"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date2"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getmyLeave, setLeave } from "../../api/student";
import { STATUS_ENUM } from "./constant";
export default {
  data() {
    return {
      // 获取个人请假表
      getLeaveData: [],
      dialogVisible: false,

      // 请假单数据
      form: {
        reason: "",
        college: "",
        grade: "",
        date1: "",
        date2: "",
        state: "",
        // delivery: false,
      },
    };
  },
  created() {
    this.getleaveform();
  },
  methods: {
    renderStatus(row) {
      const { state:status } = row || {};
      let renderString='';
      Object.values(STATUS_ENUM).map((item) => {
        if (item.code == status) renderString = item.label;
      });
      return renderString
    },
    // 个人请假表
    async getleaveform() {
      const res = await getmyLeave();
      console.log(res);
      console.log(this.getLeaveData);
      this.getLeaveData = res;
    },
    // 提交请假表
    async submit() {
      this.dialogVisible = false;
      const { reason, grade, college, date1, date2 } = this.form;
      const startime = this.$formart(date1);
      const endtime = this.$formart(date2);
      // console.log(reason,grade,college,begindate,endingdate);
      await setLeave({ reason, grade, college, startime, endtime });
      this.getleaveform();
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  float: right;
  margin: 0 20px 10px 0;
}

.el-table {
  top: 0px;
}
</style>
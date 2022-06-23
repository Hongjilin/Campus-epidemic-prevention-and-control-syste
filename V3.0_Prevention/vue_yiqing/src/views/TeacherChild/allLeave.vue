<template>
  <div>
      <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假管理</el-breadcrumb-item>
    </el-breadcrumb>
      <el-card>
          <!-- 搜索表单 -->
        <el-form ref="form" :model="qeryinfo" label-width="100px" inline>
            <el-form-item label="年级">
                <!-- <el-input v-model="qeryinfo.hot"></el-input> -->
                <el-select v-model="qeryinfo.grade" clearable placeholder="请选择">
                  <el-option label="18级" value="18级"> </el-option>
                  <el-option label="19级" value="19级"> </el-option>
                  <el-option label="20级" value="20级"> </el-option>
                  <el-option label="21级" value="21级"> </el-option>
            </el-select> 
            </el-form-item>
              
            <el-form-item label="班级">
                <el-select v-model="qeryinfo.classes" clearable placeholder="请选择">
                  <el-option label="1班" value="1班"> </el-option>
                  <el-option label="2班" value="2班"> </el-option>
                  <el-option label="3班" value="3班"> </el-option>
                  <el-option label="4班" value="4班"> </el-option>
                </el-select> 
            </el-form-item> 
            <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>


        <!-- 请假表 -->
         
    <el-table :data="getLeaveData" border style="width: 100%">
      <el-table-column prop="u_id" label="学号" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="reason" label="事由"> </el-table-column>
      <el-table-column prop="startime" label="开始时间"> </el-table-column>
      <el-table-column prop="endtime" label="结束时间"> </el-table-column>
      <el-table-column prop="state" label="审批状态">
        <template slot-scope="state">
          <el-button :type="state.row.state==0?'info':(state.row.state==1?'danger':'success')">{{rendenState(state.row)}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="classes" label="班级"> </el-table-column>
       <el-table-column prop="grade" label="年级"> </el-table-column>
       <el-table-column prop="opetate" label="操作">
         <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="openDiog(scope.row)">
                
            </el-button>
            
         </template>
      </el-table-column>
    </el-table>


    <!-- 分页器 -->
     
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[3, 5, 7, 10]"
                :page-size="qeryinfo.pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>


      <!-- 操作审批状态的对话框 -->
      <el-dialog title="审批结果" :visible.sync="dialogVisible" width="30%"
        >
        <span>
          <!--  -->
           <el-select v-model="isAgree" clearable placeholder="请选择">
                  <el-option label="通过" value="2"> </el-option>
                  <el-option label="不通过" value="1"> </el-option>
                </el-select> 
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateState()">确 定</el-button>
        </span>
      </el-dialog> 


      </el-card>
  </div>
</template>

<script>
import {getLeave,upLeaveState} from '../../api/teacher'
import '../StudentChild/constant'
import { STATUS_ENUM } from '../StudentChild/constant'
export default {
    data () {
        return {

          // 请假列表参数
           qeryinfo:{
               grade:'',
               classes:'',
               pageNum:5,
               currPage:1,

           },
           total:0,
           currentPage4: 4,
          //  健康列表数据
           getLeaveData:[],

           dialogVisible:false,
            // 保存修改该用户的id
            userId:'',
            // 保存审批状态 1不通过2通过
           isAgree:''
        }
    },
    created() {
      // 获取学生请假列表
      this.getLeaveForm()
    },
    methods: {
      rendenState(row){
          const {state} =row ||{}
          let stringState=''
          Object.values(STATUS_ENUM).map(item=>{
              if(item.code==state) return stringState=item.label
          })
          return stringState
      },
      // 点击打开操作对话框
      openDiog(row){
        this.dialogVisible=true
        this.userId=row.id
        
        console.log(this.isAgree);
      },
      // 修改用户申请状态
      async updateState(){
        await upLeaveState({id:this.userId,state:this.isAgree})
        this.dialogVisible=false
        this.getLeaveForm()
        this.isAgree=''
      },
        onSubmit(){
              this.getLeaveForm()
              this.qeryinfo.grade=""
              this.qeryinfo.classes=""
        },
         handleSizeChange(val) {
           this.qeryinfo.pageNum=val
            this.getLeaveForm()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.qeryinfo.currPage=val
         this.getLeaveForm()
        console.log(`当前页: ${val}`);
      },
      async getLeaveForm(){
        const {res} = await getLeave(this.qeryinfo)
        console.log(res);
        this.total=res.total
        this.getLeaveData=res.list
        
      }
    },
}
</script>

<style lang="less" scoped>


</style>
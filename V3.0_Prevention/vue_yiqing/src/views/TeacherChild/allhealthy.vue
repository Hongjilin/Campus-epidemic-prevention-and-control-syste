<template>
  <div>
      <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>填报管理</el-breadcrumb-item>
    </el-breadcrumb>

     <el-tabs v-model="activeName" >
        <el-tab-pane label="已打卡" name="first">
             <el-card>
          <!-- 搜索表单 -->
        <el-form ref="form" :model="qeryinfo" label-width="100px" inline>
            <el-form-item label="是否发烧">
                <!-- <el-input v-model="qeryinfo.hot"></el-input> -->
                <el-select v-model="qeryinfo.hot" clearable placeholder="请选择">
              <el-option label="是" value="是"> </el-option>
              <el-option label="否" value="否"> </el-option>
            </el-select> 
            </el-form-item>
              
            <el-form-item label="是否经过高危">
                <el-select v-model="qeryinfo.gohighrisk" clearable placeholder="请选择">
                  <el-option label="是" value="是"> </el-option>
                  <el-option label="否" value="否"> </el-option>
                </el-select> 
            </el-form-item> 
            <el-form-item label="是否核酸">
                <el-select v-model="qeryinfo.ishesuan" clearable placeholder="请选择">
                  <el-option label="是" value="是"> </el-option>
                  <el-option label="否" value="否"> </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>


        <!-- 请假表 -->
         
    <el-table :data="getHealthData" border style="width: 100%">
      <el-table-column prop="u_id" label="学号" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="temperature" label="体温"> </el-table-column>
      <el-table-column prop="hot" label="是否发烧"> </el-table-column>
      <el-table-column prop="gohighrisk" label="是否经过高危地区"> </el-table-column>
      <el-table-column prop="ishesuan" label="是否核酸"></el-table-column>
      <el-table-column prop="filldata" label="填报时间"  sortable> </el-table-column>
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
    
      </el-card>
        </el-tab-pane>
        <el-tab-pane label="未打卡" name="second">
           <el-form ref="form2" :model="qeryinfo2" label-width="100px" inline>
                <el-form-item label="选择班级">
                    
                    <el-select v-model="qeryinfo2.classes" clearable placeholder="请选择">
                      <el-option label="1班" value="1班"> </el-option>
                      <el-option label="2班" value="2班"> </el-option>
                      <el-option label="3班" value="3班"> </el-option>
                      <el-option label="4班" value="4班"> </el-option>
                    </el-select> 
                </el-form-item>
                  
                <el-form-item label="选择年级">
                    <el-select v-model="qeryinfo2.grade" clearable placeholder="请选择">
                      <el-option label="18级" value="18级"> </el-option>
                      <el-option label="19级" value="19级"> </el-option>
                      <el-option label="20级" value="20级"> </el-option>
                      <el-option label="21级" value="21级"> </el-option>
                    </el-select> 
                </el-form-item> 

                <el-button type='primary' @click="searchNoClock">查询</el-button>
                <el-button type='primary' @click="clear">清空</el-button>
           </el-form>

              <!-- 请假表 -->
         
    <el-table :data="getNoclockData" border style="width: 100%">
      <el-table-column prop="id" label="学号" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="现居地址"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="classes" label="班级"> </el-table-column>
      <el-table-column prop="college" label="学院"></el-table-column>
      <el-table-column prop="grade" label="年级"> </el-table-column>
      <el-table-column  label="操作" width="80">
        <template slot-scope="scope">
           <el-button type="success" circle icon="el-icon-check" @click="remind(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
        </el-tab-pane>
     </el-tabs>
     
  </div>
</template>

<script>
import {getHealthy,notClock} from '../../api/teacher'
export default {
    data () {
        return {
           activeName: 'first',
           message:'',
          // 健康列表参数
           qeryinfo:{
               hot:'',
               gohighrisk:'',
               ishesuan:'',
               pageNum:5,
               currPage:1,

           },
          mid:13126,
          //  未打卡列表参数
          qeryinfo2:{
            classes:'',
            grade:''
          },
          // 未打卡学生数据
          getNoclockData:[],
           total:0,
           currentPage4: 4,
          //  健康列表数据
           getHealthData:[]
        }
    },
    created() {
      // 获取学生健康列表
      this.getHealthyForm()
      this.getnotClock()
      this.ws()
    },
    methods: {
       ws(){
       this.wss = new WebSocket('ws://localhost:3131/koa/ws?id=' + this.mid)
        this.wss.onopen = function() {
                console.log('连接成功')
            }
            // 接收服务器发送的信息
        this.wss.onmessage = function(evt) {
            console.log(evt);
        }
    },
      // 提醒学生打卡
      remind(id){

        let data={
            mId: this.mid,  //不想改随便填的
            uId: id,
            content: '请尽快打卡'
      }
      this.wss.send(JSON.stringify(data))
      this.$notify({
          title: '成功',
          message: '已发送',
          type: 'success'
        });
      },
      // 查询未打卡
      searchNoClock(){
        this.getnotClock()
      },
      clear(){
        this.qeryinfo2=''
        this.getnotClock()
      },
        onSubmit(){
             this.getHealthyForm()
        },
         handleSizeChange(val) {
           this.qeryinfo.pageNum=val
           this.getHealthyForm()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.qeryinfo.currPage=val
        this.getHealthyForm()
        console.log(`当前页: ${val}`);
      },
      async getHealthyForm(){
        const {res} = await getHealthy(this.qeryinfo)
        this.total=res.total
        this.getHealthData=res.list
        
      },

      // 获取未打卡学生数据
      async getnotClock(){
        let filldata=this.$formart(new Date())
        let data = {
          filldata,
          grade:this.qeryinfo2.grade,
          classes:this.qeryinfo2.classes
        }
        const res = await notClock(data)
        this.getNoclockData=res
        
      }
    },
}
</script>

<style lang="less" scoped>


</style>
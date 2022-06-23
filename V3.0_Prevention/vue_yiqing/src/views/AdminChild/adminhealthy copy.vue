<template>
  <div>
      <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假管理</el-breadcrumb-item>
    </el-breadcrumb>
      <el-card>
          <!-- 搜索表单 -->
        <el-form ref="form" :model="qeryinfo" label-width="80px" inline>
          
              <el-button type="info" @click="daoru">导入excel</el-button>
              
            <el-form-item label="是否发烧">
                <!-- <el-input v-model="qeryinfo.hot"></el-input> -->
                <el-select v-model="qeryinfo.hot" clearable placeholder="请选择">
              <el-option label="是" value="是"> </el-option>
              <el-option label="否" value="否"> </el-option>
            </el-select> 
            </el-form-item>
              
            <el-form-item label="经过高危">
              
                <el-select v-model="qeryinfo.gohighrisk" clearable placeholder="请选择">
                  <el-option label="是" value="是"> </el-option>
                  <el-option label="否" value="否"> </el-option>
                </el-select> 
            </el-form-item> 
            <el-form-item label="学院">
                <el-select v-model="qeryinfo.college" clearable placeholder="请选择">
                  <el-option label="数计学院" value="数计学院"> </el-option>
                  <el-option label="人文学院" value="人文学院"> </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
            <!-- 导出excel组件 -->
             <el-button type="info" @click="daochu">导出excel</el-button>
           
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
      <el-table-column prop="filldata" label="填报时间"> </el-table-column>
      <el-table-column prop="college" label="学院"> </el-table-column>
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


    <!-- 上传健康表的diog -->
     <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <span>
      <!--  -->

      <el-upload drag
	       :limit=limitNum
	       :auto-upload="false"
	       accept=".xlsx"
	       :action="UploadUrl()"
	       :before-upload="beforeUploadFile"
	       :on-change="handle"
	       
	       
	       :on-error="handleError"
	       :file-list="fileList">
	    <i class="el-icon-upload"></i>
	    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	    <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
  	</el-upload>

      

 
  
  <br/>
  <el-button size="small" type="primary" @click="shangchuan">立即上传</el-button>
  <el-button size="small">取消</el-button>

  </span>
 
</el-dialog>

  </div>
</template>

<script>
import {getallhealthy,upload} from '../../api/admin'
import xlsx,{WorkSheet} from 'xlsx'
import fs from 'fs'
import uploadHealthy from '../../components/uploadHealthy.vue';
import DownloadHealthy from '../../components/downloadHealthy.vue';
const test = {
  学号: "u_id",
  姓名:'username',
  体温:'temperature',
  发烧:"hot",
  经过高危:'gohighrisk',
  核酸:'ishesuan',
  学院:'college',
  填报时间:'filldata'
};

export default {
  components: { uploadHealthy, DownloadHealthy },
    data () {
        return {

          // 健康列表参数
           qeryinfo:{
               hot:'',
               gohighrisk:'',
               ishesuan:'',
               pageNum:5,
               currPage:1,

           },
            fileList:[],
          limitNum:1,
           total:0,
           currentPage4: 4,
          //  健康列表数据
           getHealthData:[],
           dialogVisible:false,
           

          //  保存导入用户的数据
          uploadData:[],

          
           
        }
    },
    created() {
      // 获取学生健康列表
      this.getallhealthyForm()
    },
    methods: {
       // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        let size = file.size / 1024 / 1024;
        if(extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件');
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M');
        }
      },
      
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败');
      },

       UploadUrl:function(){
       // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
        return ""
      },

      
     readFile(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
      });
    },
    async handle(file) {
      let dataBinary = await this.readFile(file.raw);
      let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
      let workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(workSheet);
      this.fileList.push(file.raw) ;
       
      const temp = [];
      data.map((item) => {
        const tempItem = {};
        
        Object.keys(item).map((key) => {
          tempItem[test[key]] =item[key] ;
        });
        temp.push(tempItem)
        
      });
      // console.log(temp);
      this.uploadData=temp
      
      
    },
    // 导入用户健康表
    async shangchuan(){
          const res=  await upload(this.uploadData)
          
            this.getallhealthyForm()
      this.dialogVisible=false
      return this.$message.success('成功导入健康表')
    },
      // 导入execel
      async daoru(){
          this.dialogVisible=true
          // readFile(file) {
     
    },
      


      // 导出excel表格
      

      formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
      },
      async daochu(){
        this.$message.success('导出成功')
        // const {id,...res} = await getallhealthy(this.qeryinfo).res.list
        // // console.log(res.list);
        // require.ensure([], () => {
        // const { export_json_to_excel } = require('../../vendor/Export2Excel.js');
            
        // const tHeader = ['学号','姓名','体温','是否发烧','是否经过高危地区','是否核酸','填报时间','学院'];
        // const filterVal = [ 'u_id', 'username', 'temperature', 'hot', 'gohighrisk','ishesuan','filldata','college' ];
        // const list = res;
        // const data = this.formatJson(filterVal, list);
        // export_json_to_excel(tHeader, data, '学生健康表');
      })
  },
       
      
        onSubmit(){
            
             this.getallhealthyForm()
            
        },
         handleSizeChange(val) {
           this.qeryinfo.pageNum=val
           this.getallhealthyForm()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.qeryinfo.currPage=val
        this.getallhealthyForm()
        console.log(`当前页: ${val}`);
      },
      async getallhealthyForm(){
        const {res} = await getallhealthy(this.qeryinfo)
        this.total=res.total
        this.getHealthData=res.list
        
      }
    },
}
</script>

<style lang="less" scoped>


</style>
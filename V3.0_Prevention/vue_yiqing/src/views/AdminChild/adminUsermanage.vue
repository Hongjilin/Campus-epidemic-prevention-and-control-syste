<template>
  <div>
       <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>


     <el-card>
          <!-- 搜索表单 -->
        <el-form ref="form" :model="qeryinfo" label-width="80px" inline>
          
              <el-button type="info" @click="daoru">导入excel</el-button>
              
            <el-form-item label="班级">
              
                <el-select v-model="qeryinfo.classes" clearable placeholder="请选择">
                  <el-option label="1班" value="1班"> </el-option>
                  <el-option label="2班" value="2班"> </el-option>
                  <el-option label="3班" value="3班"> </el-option>
                  <el-option label="4班" value="4班"> </el-option>
                </el-select> 
            </el-form-item> 

            <el-form-item label="年级">
                <el-select v-model="qeryinfo.grade" clearable placeholder="请选择">
                  <el-option label="18级" value="18级"> </el-option>
                  <el-option label="19级" value="19级"> </el-option>
                  <el-option label="20级" value="20级"> </el-option>
                  <el-option label="21级" value="21级"> </el-option>
                </el-select> 
            </el-form-item> 

            <el-form-item label="学院">
                <el-select v-model="qeryinfo.college" clearable placeholder="请选择">
                  <el-option label="数计学院" value="数计学院"> </el-option>
                  <el-option label="人文学院" value="人文学院"> </el-option>
                  <el-option label="体育学院" value="人文学院"> </el-option>
                  <el-option label="生物学院" value="人文学院"> </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
            
        </el-form>

        
        <!-- 请假表 -->
         
    <el-table :data="getUserData.menData" border style="width: 100%" height="400">
      <el-table-column prop="id" label="学号" > </el-table-column>
      <el-table-column prop="username" label="姓名" ></el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="mailbox" label="邮箱"> </el-table-column>
      <el-table-column prop="address" label="家庭地址"> </el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="classes" label="班级"> </el-table-column>
      <el-table-column prop="college" label="学院"> </el-table-column>
      <el-table-column prop="grade" label="年级"> </el-table-column>
       <el-table-column prop="type" label="类型"> </el-table-column>
    </el-table>


        

     </el-card>
      <el-card>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="getUserData.currPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="getUserData.pageNum"
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
      <el-upload drag
	       :auto-upload="false"
	       accept=".xlsx"
	       :action="UploadUrl()"
	       :on-change="handle"
	       :on-error="handleError"
	       :file-list="fileList">
	    <i class="el-icon-upload"></i>
	    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	    <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
  	</el-upload>
      <el-button type="info" @click="cancel">取消</el-button>
      <el-button type="primary" @click="upload">上传</el-button>
  </span>
     </el-dialog>
  </div>
</template>

<script>
import xlsx from 'xlsx'
import {uploadUser,findUser} from '../../api/admin'
export default {
    data() {
        return {
            qeryinfo:{
                college:'',
                grade:'',
                classes:''
            },
            dialogVisible:false,
            getUserData:{
              menData:[],
              pageNum:10,
              currPage:1
              
            },
            fileList:[],
            userData:[],
            total:''
        }
    },
    created() {
      this.getlist()
    },
    methods: {
      handleSizeChange(val){
        this.getUserData.pageNum=val
        this.getlist()
      },
      handleCurrentChange(val){
        this.getUserData.currPage=val
        this.getlist()
      },

        async upload(){
           const res= await uploadUser(this.userData)
            this.$message({
          message: `成功导入${this.userData.length}条数据`,
          type: 'success'
        });
           this.getlist()
           this.dialogVisible=false
        },
        cancel(){
              this.dialogVisible=false
            this.fileList=[]
          
        },
        onSubmit(){
          this.getlist()
        },

        async getlist(){
          let data={
            college:this.qeryinfo.college,
            grade:this.qeryinfo.grade,
            classes:this.qeryinfo.classes,
            currPage:this.getUserData.currPage,
            pageNum:this.getUserData.pageNum
          }
           const res=await findUser(data)
           console.log(res);
           this.getUserData.currPage=res.currPage
           this.getUserData.pageNum=res.pageNum
           this.total=res.total
            this.getUserData.menData= res.list
        },
        daoru(){
            this.dialogVisible=true
            
        },
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
       console.log(data);
    this.userData=data
      
    },
    },
}
</script>

<style>

</style>
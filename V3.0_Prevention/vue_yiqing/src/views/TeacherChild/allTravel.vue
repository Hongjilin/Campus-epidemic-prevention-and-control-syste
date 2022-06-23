<template>
  <div>
     <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>行程管理</el-breadcrumb-item>
    </el-breadcrumb>

     <el-card>
          <!-- 搜索表单 -->
        <el-form ref="form" :model="qeryinfo"  inline @keyup.enter.native="search">
              
            <el-form-item label="学生名字:" >
              <el-input v-model="qeryinfo.username" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="学号:">
              <el-input v-model="qeryinfo.u_id" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="年级:">
                <!-- <el-input v-model="qeryinfo.hot"></el-input> -->
                <el-select v-model="qeryinfo.grade" clearable placeholder="请选择" style="width:220px">
                  <el-option label="18级" value="18级"> </el-option>
                  <el-option label="19级" value="19级"> </el-option>
                  <el-option label="20级" value="20级"> </el-option>
                  <el-option label="21级" value="21级"> </el-option>
                </el-select> 
            </el-form-item>
              
            <el-form-item label="班级:">
                <el-select v-model="qeryinfo.classes" clearable placeholder="请选择">
                  <el-option label="1班" value="1班"> </el-option>
                  <el-option label="2班" value="2班"> </el-option>
                  <el-option label="3班" value="3班"> </el-option>
                  <el-option label="4班" value="4班"> </el-option>
                </el-select> 
            </el-form-item> 
            <el-form-item label="风险等级:">
                <el-select v-model="qeryinfo.risk" clearable placeholder="请选择">
                  <el-option label="低风险城市" value="低风险"> </el-option>
                  <el-option label="中风险城市" value="中风险"> </el-option>
                  <el-option label="中高风险城市" value="中高风险"> </el-option>
                  <el-option label="高风险城市" value="高风险"> </el-option>
                </el-select> 
            </el-form-item>
              <el-form-item label="性别:">
                <!-- <el-input v-model="qeryinfo.hot"></el-input> -->
                <el-select v-model="qeryinfo.sex" clearable placeholder="请选择">
                  <el-option label="男" value="男"> </el-option>
                  <el-option label="女" value="女"> </el-option>
                </el-select> 
              </el-form-item>

              <div style="float:right;margin-right: 140px;">
                   <el-button type="primary" >列项设置</el-button>
                  <el-button type="primary"  @click="search">搜索</el-button>
                  
              </div>
            
          
        </el-form>
     </el-card >

     <el-card>
        <el-table :data="tableData" style="width: 100%" height="300">
            <el-table-column  :prop="item.prop"  :label="item.laber"  
            width="180" v-for="item in col" :key="item.id" :fixed="item.fiexd"
            ></el-table-column>
            <el-table-column fixed="right" label="行程图" >
              <template slot-scope="scope" >
                  <el-popover  trigger="hover" >
                        <img slot="reference" :src="$host+scope.row.uploadXC" style="width:50px;height:50px"> 
                        <img   :src="$host+scope.row.uploadZP" style="width:250px;height:250px"> 
                  </el-popover>
              </template>
            </el-table-column>
            <el-table-column  label="到家自拍" fixed="right">
              <template slot-scope="scope1" >
                  <el-popover  trigger="hover" >
                        <img slot="reference" :src="$host+scope1.row.uploadZP" style="width:50px;height:50px"> 
                        <img   :src="$host+scope1.row.uploadZP" style="width:250px;height:250px"> 
                  </el-popover>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="点击提醒">
              <template slot-scope="scope">
                 <el-button type="success" icon="el-icon-check" circle @click="remind(scope.row.u_id)"></el-button>
              </template>
            </el-table-column>
        </el-table>
     </el-card>

     <el-card>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="qeryinfo.currPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="qeryinfo.pageNum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
     </el-card>
  </div>
</template>

<script>
import {allTeavel} from '../../api/teacher'
export default {
  data() {
    return {
      qeryinfo:{
        username:'',
        u_id:'',
        grade:'',
        classes:'',
        sex:'',
        risk:'',
        pageNum:5,
        currPage:1
      },
      wss:'',
      mid:100,
      total:'',
      tableData:[
        
      ],
      col:[
        { prop:'username', laber:'姓名', show:true,fiexd:true,id:1},
        { prop:'u_id', laber:'学号', show:true,fiexd:true,id:2 },
        { prop:'sex', laber:'性别', show:true,fiexd:false,id:3 },
        { prop:'grade', laber:'学号', show:true,fiexd:false,id:4 },
        { prop:'grade', laber:'学号', show:true,fiexd:false,id:5 },
        { prop:'date', laber:'离校时间', show:true,fiexd:false,id:6 },
        { prop:'city', laber:'目的城市', show:true,fiexd:false,id:7 },
        { prop:'address', laber:'详细地址', show:true,fiexd:false,id:8},
        { prop:'risk', laber:'风险等级', show:true,fiexd:false,id:9 },
        { prop:'chuxing', laber:'出行方式', show:true,fiexd:false,id:10},
        { prop:'telephone', laber:'联系方式', show:true,fiexd:false,id:11 },
      ]
    }
  },
  created() {
    this.getData()
    this.ws()
  },
  beforeDestroy() {
    
  }
  ,
  methods: {
    async search(){
        await allTeavel(this.qeryinfo)
         this.getData()
        
         
    },
    ws(){
       this.wss = new WebSocket('ws://localhost:3131/koa/ws?id=' + this.mid)
        this.wss.onopen = function() {
                console.log('连接成功')
            }
            // 接收服务器发送的信息
        this.wss.onmessage = function(evt) {
            console.log(evt)
        }
    },
    // 点击提醒学生到家确认上传图片
    remind(id){
      let data={
            mId: this.mid,
            uId: id,
            content: '请尽快上传行程码'
      }
      this.wss.send(JSON.stringify(data))
    } ,
     handleSizeChange(val) {
        this.qeryinfo.pageNum=val
        this.getData()
      },
      handleCurrentChange(val) {
        this.qeryinfo.currPage=val
         this.getData()
      },
      async getData(){
       const res= await allTeavel(this.qeryinfo)
       console.log(res);
       this.tableData=res.list
       this.total=res.total
      }
  },
}
</script>

<style lang="less" scoped>


</style>
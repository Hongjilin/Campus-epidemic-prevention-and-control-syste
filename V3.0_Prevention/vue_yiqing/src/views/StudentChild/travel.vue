<template>
  <div>
       <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>行程管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <el-form ref="form"  :rules='rules' :model="form" label-width="80px" inline>
                 

                 <el-form-item label="出校日期" >
                    
                    <el-form-item prop="date" style="width:220px">
                        <el-date-picker  value-format="yyyy-MM-dd"   type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    
                 </el-form-item>

                 <el-form-item label="联系方式" prop="telephone" >
                    <el-input v-model="form.telephone" placeholder="请输入电话号码" style="width:220px" ></el-input>
                </el-form-item>
                  <el-form-item label="所在城市"  prop="city">
                    <el-input v-model="form.city" placeholder="如福建省漳州市" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="详细地址"  prop="address">
                    <el-input v-model="form.address" style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="风险等级"  prop="risk">
                    <el-select v-model="form.risk" placeholder="活动区域">
                        <el-option label="低风险城市" value="低风险"></el-option>
                        <el-option label="中风险地区" value="中风险"></el-option>
                        <el-option label="中高风险地区" value="中高风险"></el-option>
                        <el-option label="高风险地区" value="高风险"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出行方式"  prop="chuxing">
                    <el-select v-model="form.chuxing" placeholder="请选择" style="width:220px">
                        <el-option label="步行" value="步行"></el-option>
                        <el-option label="公交" value="公交"></el-option>
                        <el-option label="网约车/出租车" value="网约车/出租车"></el-option>
                        <el-option label="动车" value="动车"></el-option>
                        <el-option label="飞机" value="飞机"></el-option>
                        <el-option label="家人接送" value="家人接送"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" ref="sub"  @click="onSubmit('form')">提交</el-button>
                    
                </el-form-item>
        </el-form>
    </el-card>

    <el-card>
         <el-table  :data="tableData" border style="width: 100%" :height="tableheight" >
            <el-table-column  prop="date" label="出校日期" width="150"  sortable> </el-table-column>
            <el-table-column  prop="telephone" label="联系方式" width="150"> </el-table-column>
            <el-table-column  prop="city" label="目的城市" width="150"> </el-table-column>
            <el-table-column  prop="address" label="详细地址" width="150" show-overflow-tooltip> </el-table-column>
            <el-table-column  prop="risk" label="风险等级" width="150"> </el-table-column>
            <el-table-column  prop="chuxing" label="出行方式" width="150"> </el-table-column>
            <el-table-column   label="行程码" width="120" fixed="right" > 
                <template slot-scope="XC">
                    <el-button type='primary' v-if="!XC.row.uploadXC" @click="tripOpen(XC.row.id)">点击上传</el-button>
                    <el-popover  trigger="hover" v-else>
                        <img slot="reference" :src="$host+XC.row.uploadXC" style="width:50px;height:50px"> 
                        <img   :src="$host+XC.row.uploadXC " style="width:250px;height:250px"> 
                    </el-popover>
                   
                </template>
            </el-table-column>
            <el-table-column   label="到家自拍" width="120" fixed="right" > 
                <template slot-scope="scope">
                    <el-button @click="homeOpen(scope.row.id)"  type='primary' v-if="!scope.row.uploadZP" style="height:'120px'">点击上传</el-button>
                    <el-popover  trigger="hover" v-else>
                        <img slot="reference" :src="$host+scope.row.uploadZP" style="width:50px;height:50px"> 
                        <img   :src="$host+scope.row.uploadZP" style="width:250px;height:250px">
                       
                    </el-popover>
                     
                </template>
            </el-table-column>
            
            
         </el-table>
    </el-card>

    <travel-dialog-trip ref="trip" @changeXC="change"></travel-dialog-trip>
    <travel-dialog-home ref="home" @changeZP="change"></travel-dialog-home>
  </div>
</template>

<script>
import TravelDialogHome from '../../components/diog/travelDialogHome.vue';
import travelDialogTrip from '../../components/diog/travelDialogTrip.vue';
import { getUserData } from "../../api/user";
import {subTravel,findTravel} from '../../api/student'
export default {
  components: { travelDialogTrip, TravelDialogHome },
    data() {
         var telephonevalidate = function (rule, value, callback) {
            if (value === '') {
                callback(new Error('手机号不能为空'))
            } else if (!/^1\d{10}$/.test(value)) {
                callback(new Error('手机号格式错误'))
            } else {
                callback()
            }
            }
        return {
            tableheight:400,
            rules:{
                telephone:[
                     {validator: telephonevalidate, trigger: 'blur'}
                ],
                date:[
                     {  required: true, message: '请选择日期', trigger: 'blur'}
                ],
                city:[
                     { required: true, message: '请输入目的城市', trigger: 'blur' }
                ],
                chuxing:[
                     { required: true, message: '请选择出行方式', trigger: 'blur' }
                ],
                risk:[
                     { required: true, message: '请选择风险等级', trigger: 'blur' }
                ],
                address:[
                     { required: true, message: '请输入家庭详细地址', trigger:'blur' }
                ]
            },
            form:{
                
                risk:"",
                date:"",
                telephone:'',
                city:'',
                address:'',
                chuxing:''
            },
            tripImg:'',
            homeImg:'',
            tableData:[
                
            ],
             imageUrl: '',
             
        }
    },
    created() {
        this.getTableData()
        // this.receive()
        
    },
    methods: {
        change(){
            this.getTableData()
        },
        // async receive(){
        //     const res = await getUserData()
        //     console.log(res.id);
        //     let webs=null;
        //      webs = new WebSocket('ws://localhost:3131/koa/ws?id=' + res.id)
        //      webs.onopen = function() {
        //         console.log('连接成功')
                
        //     }
        //     // 接收服务器发送的信息
        // webs.onmessage = function(evt) {
        //     console.log(evt)
            
        // }
        // },
         homeOpen(val){
             this.$refs.home.open(val)
         },
         tripOpen(val){
             
             this.$refs.trip.open(val)
         },
        //  获取table数据
        async getTableData(){
          const res=  await findTravel()
          this.tableData=res
        },

       
            
            
            
       
        //  提交表单
         async onSubmit(form){
             
             
            //  获取基本个人信息
              const {id:u_id,username,sex,classes,college,grade}=await getUserData()  
            //   获取表单信息
            
           await this.$refs[form].validate(async valid=>{
                if(!valid) return
               const obj= Object.assign(this.form,{u_id,username,sex,classes,college,grade})
                 await subTravel(obj)
                 this.$message.success('提交成功')
                this.form=''
            })
            this.getTableData()
           
            
         }
    },
}
</script>

<style lang="less" scoped>
.submit{
    float: right;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>
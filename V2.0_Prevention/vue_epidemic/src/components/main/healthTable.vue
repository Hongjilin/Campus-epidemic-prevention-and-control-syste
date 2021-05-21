<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align:center">
            <span>健康信息上报</span>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
              prop="username"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="classes"
              label="班级">
            </el-table-column>
            <el-table-column
              prop="address"
              label="生源地">
            </el-table-column>
          </el-table>
        </el-card>
        <el-divider></el-divider>

      <el-card v-if="show==false">
          <div slot="header" style="text-align: center">
              <span>今日检测情况</span>
          </div>
          <el-alert
                  title="今日申请表提交成功"
                  type="success"
                  center
                  show-icon>
          </el-alert>
          <el-table
                  :data="tableData1"
                  border
                  style="width: 100%">
              <el-table-column
                      prop="temperature"
                      label="当前体温">
              </el-table-column>
              <el-table-column
                      prop="hot"
                      label="是否发热、咳嗽">
              </el-table-column>
              <el-table-column
                      prop="fever"
                      label="是否有去就诊">
              </el-table-column>
              <el-table-column
                      prop="gohubei"
                      label="是否去过高危地区">
              </el-table-column>
              <el-table-column
                      prop="hubeiren"
                      label="是否为高危地区人员">
              </el-table-column>
              <el-table-column
                      prop="mask"
                      label="是否接触过高危地区人员">
              </el-table-column>
              <el-table-column
                      prop="leaveout"
                      label="是否离开过学校">
              </el-table-column>
              <el-table-column
                      prop="hesuan"
                      label="是否做过核酸检测">
              </el-table-column>
              <el-table-column
                      prop="masknum"
                      label="口罩数量">
              </el-table-column>
              <el-table-column
                      prop="kills"
                      label="杀毒用品是否充足">
              </el-table-column>
          </el-table>

      </el-card>

        <el-card v-else-if="show==true">
          <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="当前体温">
                    <el-input v-model="form.temp" style="width:130px"></el-input>
                </el-form-item>
                <el-form-item label="是否发热、咳嗽">
                    <el-radio-group v-model="form.radio1">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否有去就诊">
                    <el-radio-group v-model="form.radio2">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否去过高危地区">
                    <el-radio-group v-model="form.radio3">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
              <el-form-item label="是否为高危地区人员">
                  <el-radio-group v-model="form.radio9">
                      <el-radio label="否"></el-radio>
                      <el-radio label="是"></el-radio>
                  </el-radio-group>
              </el-form-item>
                <el-form-item label="是否接触过高危地区人员">
                    <el-radio-group v-model="form.radio7">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否离开过学校">
                    <el-radio-group v-model="form.radio5">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否做过核酸检测">
                    <el-radio-group v-model="form.radio6">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="口罩数量">
                    <el-input v-model="form.number" style="width:130px"></el-input>
                </el-form-item>
                <el-form-item label="杀毒用品是否充足">
                    <el-radio-group v-model="form.radio8">
                    <el-radio label="否"></el-radio>
                    <el-radio label="是"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="open">提交</el-button>
                </el-form-item>
                </el-form>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
      return {
          show:true,
        tableData: [],
          tableData1: [],
        form: {
          temp: '',
          number:'',
          radio1: '',
          radio2: '',
          radio3: '',
          radio4: '',
          radio5: '',
          radio6: '',
          radio7: '',
          radio8: '',
            radio9: '',
        }
      }
    },
    created(){
        /**根据token获取当前用户信息
         * this.tableData列表数据
         * */
        this.$axiosjwt({
            url:"/users/getUserDataByToken",
            method:"get",
            data:{},
            success:(result)=>{
                this.tableData.push(result)
            }
        })

        /**
         *
         *调用获取当天某用户报表并且决定是否允许填写
         */
        this.getnowdatah()
    },
     methods: {
         /**
          *   //获取当天某用户报表并且决定是否允许填写
          */
      getnowdatah(){
          this.$axiosjwt({
              url:'/students/getHealthNowDayByid',
              method:"get",
              data:{},
              success:(result)=> {
                //   console.log(result,"xxxxxxxxxxxxx这是结果!!!!!!!!!!!!!!!!!!!!!---------------------")
                  if(result.length==0) this.show=true
                  else {
                      this.show=false;
                      this.tableData1.push(result[0])
                  }
              }
          });
      },/**
          健康表提交
          temperature:this.form.temp,
          hot:this.form.radio1,
          gohubei:this.form.radio3,
          hubeiren:this.form.radio9,
          leave:this.form.radio5,
          hesuan:this.form.radio6,
          mask:this.form.radio7,
          masknum:this.form.number,
          kill:this.form.radio8,
          fever:this.form.radio2,
          */
         onSubmit() {
             if (!this.form.temp || !this.form.radio1 || !this.form.radio3 || !this.form.radio9 || !this.form.radio5 || !this.form.radio6 ||!this.form.radio7 ||!this.form.number || !this.form.radio8 || !this.form.radio2)
                this.open3("填报表不可留空")
             else{
                 let reg=/^\d+(\.\d+)?$/
                 let reg1=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
                 let tempBool=reg1.test(this.form.temp)
                 let   mskBool=reg.test(this.form.number)
                 if (!tempBool) this.open3("体温请输入数字")
                 else{
                     if (!mskBool)  this.open3("口罩数量请用数字方式输入")
                     else{
                         this.$axiosjwt({
                             url:"/students/sethealth",
                             method:"post",
                             data:{
                                 temperature:this.form.temp,
                                 hot:this.form.radio1,
                                 gohubei:this.form.radio3,
                                 hubeiren:this.form.radio9,
                                 leave:this.form.radio5,
                                 hesuan:this.form.radio6,
                                 mask:this.form.radio7,
                                 masknum:this.form.number,
                                 kill:this.form.radio8,
                                 fever:this.form.radio2,
                             },
                             success:(result)=>{
                                 this.$message({
                                     type:'success',
                                     message:"提交成功"
                                 })
                                 if (result.length!=0){
                                     this.getnowdatah()
                                 }
                             }
                         })
                     }
                     
                 }


             }
         },
         /**
          * 提交弹窗
          */
         open() {
             this.$confirm('提交健康报表, 是否继续?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
             }).then(() => {
                 this.onSubmit()
             }).catch(() => {
                 this.$message({
                     type: 'info',
                     message: '已取消提交'
                 });
             });
         },
         open3(v) {
             this.$message({
                 message:v,
                 type: 'warning'
             });
         },

    },
}
</script>

<style scoped lang="scss">

</style>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align:center">
            <span>请假管理</span>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              label="申请时间">
              <template slot-scope="scope">{{ scope.row.createtime | date}}</template>
            </el-table-column>
            <el-table-column
                    prop="u_id"
              label="申请人">
              <!--<template slot-scope="scope">{{ scope.row.u_id | username}}</template>-->
            </el-table-column>
            <el-table-column
              prop="leavetype"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="reason"
              label="详细信息">
            </el-table-column>
            <el-table-column
              prop="state"
              label="审核结果">
              <template slot-scope="scope">{{ scope.row.state | state1}}</template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button style="padding: 3px 0" type="text" @click="view(scope.$index, scope.row,2)">同意</el-button>
                <el-button style="padding: 3px 0" type="text" @click="view(scope.$index, scope.row,1)">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align:center;margin-top:20px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20,25]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="UserSize">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
      return {
          UserSize:0,
          currentPage: 12,
          tableData: [],
          pageSize:5,
          pageNo:1,
          currentPage1: 10,
      }
    },
    created(){
      this.getapplication(this.pageNo,this.pageSize)
    },
    filters:{
        date(time){
            var dt = new Date(time);
            // yyyy-mm-dd
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            var hh = dt.getHours();
            var mm = dt.getMinutes();
            var ss = dt.getSeconds();
            return y + "-" + m + "-" + d + "  " + hh + ":" + mm + ":" + ss
        },
        state1(int){
            if(int==0){return "未审批"};
            if(int==1){return "审批不通过"};
            if(int==2){return "审批通过"};
        },
    },
     methods: {
         /**
          * 修改审批状态为同意
          l_id:row.l_id,
          upState:2
          */
      view(index,row,upState){
          this.$axiosjwt({
              url:"/admin/upLeaveState",
              method:"get",
              data:{
                  l_id:row.l_id,
                  upState
              },success:(result)=>{
                  this.getapplication(this.pageNo,this.pageSize)
              }
          })



      },
         /**
          获取请假单
          * @param no
          * @param size
          currPage:no,
          pageNum:size
          this.pageNo=1
          this.tableData=result.data;
          this.UserSize = result.total
          */
         getapplication(no,size){
           no=Number(no)-1
          this.$axiosjwt({
              url:'/admin/getLeave',
              method:'get',
              data:{
                  currPage:no,
                  pageNum:size
              }
              ,success:(result)=>{
                  this.pageNo=1
                  this.tableData=result.data;
                  this.UserSize = result.total
              }
          })
        },


         //分页
         handleSizeChange(val) {
             this.pageSize=val;
             this.getapplication(this.pageNo,this.pageSize)
         },
         handleCurrentChange(val) {
             this.pageNo=val;
             this.getapplication(this.pageNo,this.pageSize)
         }
    },
}
</script>

<style scoped lang="scss">

</style>

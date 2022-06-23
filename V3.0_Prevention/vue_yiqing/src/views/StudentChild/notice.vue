<template>
  <div>
      <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>通知</el-breadcrumb-item>
    </el-breadcrumb>

      <el-table 
      :data="noticeData" :v-show="noticeData.is_del=='0'?false:true"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        
        :show-overflow-tooltip="true"
        prop="content"
        label="内容"
        width="680">
        
      </el-table-column>
     
      <el-table-column
      label="发起人">
        <template slot-scope="scope">
          <el-button   type="primary" @click="aa(scope.row.id)">辅导员</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="cretetime"
        label="发布时间">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[2, 3, 5, 7]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20">
    </el-pagination>
    <!-- 公告内容 -->
    <el-dialog
  title="公告内容"
  :visible.sync="dialogVisible"
  width="50%"
  >
  <div>这是一段信息</div>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
   
</template>

<script>
export default {
  data() {
    return {
        noticeData: [{
          title:"放假啦",
          content:"dhasuod asdhauosd hasuod asu d",
          state:0,
          cretetime:"2022-02-24",
          
        },
        {
          title:"放假啦",
          content:"dhasuod asdhauosd hasuod asu d",
          state:0,
          cretetime:"2022-02-24",
          
        }],
          dialogVisible:false
    }
  },
  methods: {
    aa(value){
      this.dialogVisible=true
    }
  },
}
</script>

<style>

</style>
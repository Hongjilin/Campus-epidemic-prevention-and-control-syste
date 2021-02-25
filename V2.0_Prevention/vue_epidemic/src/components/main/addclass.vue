<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>添加班级</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input
                            placeholder="请输入要添加的内容"
                            v-model="input"
                            clearable
                            style="width: 15rem">
                    </el-input>
                    <el-button type="primary" @click="add">添加</el-button>
                </el-col>
                <el-col :span="12">
                    <el-input
                            placeholder="请输入查找内容"
                            v-model="input1"
                            clearable
                            style="width: 15rem">
                    </el-input>
                    <el-button type="primary" @click="select">查找</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-divider></el-divider>
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>所有班级</span>
            </div>
            <el-table
                    :data="tableData"
                    border
                    :default-sort = "{prop: 'c_id', order: 'descending'}"
                    style="width: 100%">
                <el-table-column
                        prop="c_id"
                        sortable
                        label="班级编号">
                </el-table-column>
                <el-table-column
                        prop="classes"
                        label="班级名称">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            style="margin-top: 2rem;text-align: center">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        pageSize:10,
        pageNo:1,
        data(){
            return{
                total:0,
                currentPage1: 0,
                tableData:[],
                input:'',
                input1:''
            }
        },
        created(){
            this.getclass();
        },
        methods:{
            /**
             * 添加班级
             Classes:this.input
             */
            add(){
                if (!this.input) this.open3("提交添加班级不可为空")
                else{
                    this.$axiosjwt({
                        url:"/admin/addClasses",
                        method:"get",
                        data:{
                            classes:this.input
                        },success:(result)=>{
                            this.open2("添加班级成功")
                            this.getclass()
                        }
                    })
                }
                
            },
            /**
             * 模糊查询
             inputText:this.input1,
             this.tableData=result.data;
             this.total=result.data.length;
             */
            select(){
                if (!this.input1) this.open3("请填写要查找的内容!!!!!!!")
                else{
                    this.$axiosjwt({
                        url:"/admin/getClassesSear",
                        method:"get",
                        data:{
                            inputText:this.input1,
                            currPage:0,
                            pageNum:10
                        },success:(result)=>{
                            this.tableData=result.data;
                            this.total=result.data.length;
                        }
                    })
                }
                
            },
            /**
             * 获取班级信息
             this.tableData=result.data;
             this.total=result.data.length;
             */
            getclass(){
                this.$axiosjwt({
                    url:"/admin/getClasses",
                    method:"get",
                    data:{ },
                    success:(result)=>{
                        console.log(result)
                        this.tableData=result;
                        this.total=result.length;
                    }
                })

            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize=val;
                //自行添加分页
            },
            handleCurrentChange(val) {
                // console.log(`当前页${val} `);
                this.pageNo=val;
            },
            open1(v) {
                this.$message(v);
            },
            open2(v) {
                this.$message({
                    message:v,
                    type: 'success'
                });
            },
            open3(v) {
                this.$message({
                    message:v,
                    type: 'warning'
                });
            },
            open4(v) {
                this.$message.error(v);
            }
        }
    }
</script>

<style scoped>

</style>
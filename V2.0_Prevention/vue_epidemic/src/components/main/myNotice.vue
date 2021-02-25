<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix" style="text-align:center">
                        <span>我的通知</span>
                    </div>
                    <el-table
                            :data="tableData"
                            border
                            :default-sort="{prop: 'date', order: 'descending'}"
                            style="width: 100%">
                        <el-table-column
                                prop="n_id"
                                sortable
                                label="序列号">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="主题">
                        </el-table-column>
                        <el-table-column
                                prop="type1"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                label="创建时间">
                            <template slot-scope="scope">{{ scope.row.createtime | date}}</template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button style="padding: 3px 0" type="text" @click="readN(scope.$index, scope.row)">
                                    未读
                                </el-button>
                                <el-button style="padding: 3px 0" type="text" @click="readY(scope.$index, scope.row)">
                                    已读
                                </el-button>
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
                show: true,
                UserSize: 0,
                currentPage: 1,
                tableData: [],
                pageSize: 5,
                pageNo: 1,
            }
        },
        created() {
            this.getvalue(this.pageSize, this.pageNo);
        },
        filters: {
            date(time) {
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
        },
        methods: {
            open2(v) {
                this.$message({
                    message: v,
                    type: 'success'
                });
            },
            /**
             * 已读与未读转换
             * @param index
             * @param row
             */
            readN(index, row) {
                this.$axiosjwt({
                    url:"/students/goweidu",
                    method:"get",
                    data:{
                        n_id:row.n_id
                    },
                    success: (result) => {
                        this.open2('已修改为未读')
                        this.getvalue(this.pageSize, this.pageNo);
                    }
                });
            },
            readY(index, row) {
                this.$axiosjwt({
                    url:"/students/goyidu",
                    method:"get",
                    data:{
                        n_id:row.n_id
                    },
                    success: (result) => {
                        this.getnew()
                        this.open2('已修改为已读')
                    }
                });
            },


            /**
             * 我的通知分页获取数据与数量
             * */
            getvalue(pageNum, currPage) {
                this.$axiosjwt({
                    url: "/students/getNotice",
                    method: "get",
                    data: {
                        pageNum: pageNum,
                        currPage: currPage - 1
                    },
                    success: (result) => {
                        this.UserSize = result.total;
                        result.data.forEach((v, i) => {
                            v.type1 = "未读"
                        })
                        this.tableData = result.data;
                        this.getnew()
                    }
                });
            },
            /**
             * 获取的我通知已读列表(供已读未读状态渲染)
             */
            getnew() {
                console.log("进入getnew")
                //等同于绑定
                this.$axiosjwt({
                    url:"/students/getNoticeRead",
                    method:"get",
                    data:{},
                    success: (result) => {
                        //判断是否已读未读
                        result.forEach(((item, index) => {
                            let val = item.n_id;
                            this.tableData.forEach((value, index) => {
                                if (val == value.n_id) {
                                    value.type1 = "已读"
                                }
                            })
                        }))
                    }
                });
            },
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.getvalue(this.pageSize, this.pageNo)
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getvalue(this.pageSize, this.pageNo)
            }
        },
    }
</script>

<style scoped lang="scss">

</style>

<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>填写假条</span>
                    </div>
                    <el-select v-model="value" placeholder="请选择请假类型">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div style="height:20px"></div>
                    <el-date-picker
                            v-model="value2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    <div style="height:20px"></div>
                    <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="textarea"
                            maxlength="100"
                            show-word-limit>
                    </el-input>
                    <div style="height:20px"></div>
                    <div style="float: right">
                        <el-button type="primary" @click="onapplication">提交</el-button>
                        <div style="height:20px"></div>
                    </div>

                </el-card>
                <el-divider><i class="el-icon-loading"></i></el-divider>
                <el-card style="margin-top:20px ;margin-bottom: 5rem">
                    <el-table
                            :data="tableData"
                            border
                            :default-sort="{prop: 'createtime', order: 'descending'}"
                            style="width: 100%">
                        <el-table-column
                                label="申请时间"
                                sortable>
                            <template slot-scope="scope">{{ scope.row.createtime | date}}</template>
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
                                label="审核结果">
                            <template slot-scope="scope">{{ scope.row.state | state}}</template>
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
            <!--<div style="width: 100%;height: 70rem"></div>-->
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                UserSize: 0,
                currentPage: 0,
                tableData: [],
                pageSize: 5,
                pageNo: 1,
                currentPage1: 1,
                text: '',
                textarea: '',
                options: [{
                    value: '请假',
                    label: '请假'
                }, {
                    value: '外出',
                    label: '外出'
                }],
                value: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
                value2: ''
            }
        },
        created() {
            this.getapplication(this.pageNo, this.pageSize)
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
            state(type) {
                if (type == 0) {
                    return "未审批"
                }
                if (type == 1) {
                    return "审批不通过"
                }
                if (type == 2) {
                    return "审批通过"
                }
            }
        },
        methods: {
            /**获取我的请假单
             *
             currPage:no-1,
             pageNum:size
             this.tableData=result.data;
             this.UserSize = result.total
             * */
            getapplication(no, size) {
                this.$axiosjwt({
                    url: "/admin/getuserLeave",
                    method: "get",
                    data: {
                        currPage: no - 1,
                        pageNum: size
                    }, success: (result) => {
                        this.tableData = result.data;
                        this.UserSize = result.total
                    }
                })
            },
            /**
             * 请假
             *
             reason:this.textarea,
             leavetype:this.value,
             starttime:starttime,
             endtime:endtime
             this.value2[0]请假起始时间
             this.value2[1]请假结束时间
             */
            onapplication() {
                if (!this.textarea || !this.value || !this.value2) this.open3("请假信息不可以留空")
                else {

                    let dtstart = new Date(this.value2[0])
                    let dtend = new Date(this.value2[1])
                    let starttime = ""
                    let endtime = ""
                    if ((dtstart.getMonth() + 1) < 10) starttime = dtstart.getFullYear() + "-0" + (dtstart.getMonth() + 1) + "-" + dtstart.getDate()
                    else starttime = dtstart.getFullYear() + "-" + (dtstart.getMonth() + 1) + "-" + dtstart.getDate()
                    if ((dtend.getMonth() + 1) < 10) endtime = dtend.getFullYear() + "-0" + (dtend.getMonth() + 1) + "-" + dtend.getDate()
                    else endtime = dtend.getFullYear() + "-" + (dtend.getMonth() + 1) + "-" + dtend.getDate()


                    this.$axiosjwt({
                        url: "/students/setLeave",
                        method: "post",
                        data: {
                            reason: this.textarea,
                            leavetype: this.value,
                            starttime: starttime,
                            endtime: endtime
                        },success:(result)=>{
                            this.getapplication(this.pageNo,this.pageSize)
                            this.open2(result)
                            this.textarea=""
                            this.value=""
                            this.value2=""
                        }
                    })


                }

            },
            open1(v) {
                this.$message(v);
            },
            open2(v) {
                this.$message({
                    message: v,
                    type: 'success'
                });
            },

            open3(v) {
                this.$message({
                    message: v,
                    type: 'warning'
                });
            },

            open4(v) {
                this.$message.error(v);
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getapplication(this.pageNo, this.pageSize)
            },
            handleCurrentChange(val) {
                // console.log(`当前页${val} `);
                this.pageNo = val;
                this.getapplication(this.pageNo, this.pageSize)
            }
        }
    }
</script>
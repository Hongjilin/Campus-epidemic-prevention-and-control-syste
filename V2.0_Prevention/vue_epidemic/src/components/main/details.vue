<template>
    <div>
        <div slot="header" class="clearfix" style="text-align: center">
            <span>通知详情查看</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="cls">关闭</el-button>
        </div>
        <el-table
                :data="tableData1"
                border
                style="width: 100%">
            <el-table-column
                    prop="n_id"
                    label="序列号">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="主题">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="通知的班级">
            </el-table-column>
            <el-table-column
                    label="发布时间">
                <template slot-scope="scope">{{ scope.row.createtime | date}}</template>
            </el-table-column>
        </el-table>
        <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="8">
                <el-card style="height: 300px">
                    <ve-pie :data="chartData"
                            :settings="Settings"
                            :legend-visible="false">
                    </ve-pie>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card >
                    <div slot="header" class="clearfix" style="text-align: center">
                        <span>访问的用户</span>
                    </div>
                    <el-row :gutter="20"style="overflow-y: scroll;height: 12.5rem">
                        <el-col :span="4"  v-for="(item,index) in users" :key="index" class="ca" style="margin-bottom: 3rem;margin-top: 0.7rem"  >
                            <el-card :body-style="{ padding: '0px' }" style="min-height: 11rem" class="imgcar">
                                <div style="width:100%;height:6rem ;">
                                    <img :src="imgPath+item.head" style="width:100%;height:100%  ; object-fit:cover;" >
                                </div>
                                <div style="margin-top: 0.8rem;padding-left: 0.8rem; padding-right: 0.8rem;margin-bottom: 1rem ; height:3rem;margin-bottom: 5px; overflow-y: scroll" >
                                    <span>{{item.username}}</span>
                                    <div class="bottom clearfix" style=" height: 1rem;overflow: hidden">
                                        <time class="time">{{item.classes}}</time>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "details",
        data(){
            return{
                tableData1: [],
            }
        },
        props:['user'],
        created(){
            this.$Axios({
            url:"/admin/NoticeDetails",
                method:"get",
                data:{
                n_id:this.user
                },
                success:(result)=> {
                    let arr =[];
                    this.tableData1 = [
                        {"n_id":2,"title":"头裂了","content":null,"createtime":"2020-08-26T07:39:52.000Z","class":"1班;2班"}
                    ];
                    this.users=result.users;
                    this.chartData.rows.push(
                        { '类型': '已读', '用户': result.readNum },
                        { '类型': '未读', '用户': result.total-result.readNum },
                    )
                    this.show=false;
                }
            });
        }
    }
</script>

<style scoped>

</style>
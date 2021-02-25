<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <el-select v-model="value" placeholder="请选择查询字段" style="width: 15%">
                        <el-option label="学号" value="id"></el-option>
                        <el-option label="姓名" value="username"></el-option>
                        <el-option label="籍贯" value="address"></el-option>
                        <el-option label="班级" value="classes"></el-option>
                    </el-select>
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="input"
                            style="width:20%">
                    </el-input>
                    <el-button type="primary" size="small" style="margin-left:10px" @click="select">搜索</el-button>
                    <el-button type="primary" size="small" style="margin-left:10px" @click="clearvalue">重置</el-button>
                    <el-button type="primary" size="small" style="float:right" v-show="!show" color="#F56C6C"
                               @click="show = !show"><i class="el-icon-upload el-icon--left"></i>上传
                    </el-button>
                </el-card>
                <transition name="el-zoom-in-top">
                    <el-card class="box-card" v-show="show" style="margin-top: 10px">
                        <div slot="header" class="clearfix" style="text-align: center">
                            <span>上传excel表格（.xlsx）</span>
                        </div>
                        <div class="transition-box" style="display: flex;margin-top: 40px">
                            <el-upload
                                    ref="upload"
                                    class="upload-demo"
                                    drag
                                    :action="imgpath"
                                    multiple style="margin: auto">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip" style="text-align: center">
                                    文件上传速度跟当前环境有关，请耐心等待
                                    <el-row :gutter="20" style="margin-top: 10px">
                                        <el-col :span="12">
                                            <el-button size="small" @click="show = !show" style="width: 100%">关闭
                                            </el-button>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button size="small" type="primary" @click="importxlsx"
                                                       style="width: 100%">导入
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-upload>
                        </div>

                        <!--<form :action="imgpath" enctype="multipart/form-data" method="post" style="margin: auto">-->
                        <!--<input type="file" name="upload" multiple="multiple"><br>-->
                        <!--<input type="submit" value="Upload">-->
                        <!--</form>-->
                    </el-card>
                </transition>
                <el-card style="margin-top:20px;margin-bottom: 5rem" v-if="show1==false">
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                sortable
                                label="学号">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="生源地">
                        </el-table-column>
                        <el-table-column
                                prop="classes"
                                label="班级">
                        </el-table-column>
                        <el-table-column
                                label="类型">
                            学生
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button style="padding: 3px 0" type="text" @click="open(scope.$index, scope.row)">
                                    删除
                                </el-button>
                                <el-button style="padding: 3px 0" type="text" @click="cshow(scope.$index, scope.row)">
                                    编辑
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="text-align:center;margin-top:20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 40,50]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="UserSize">
                        </el-pagination>
                    </div>
                </el-card>
                <el-card style="margin-top:20px" v-else-if="show1==true">
                    <el-page-header @back="goBack" content="详情页面">
                    </el-page-header>
                    <br>
                    <el-form ref="form" v-model="form" label-width="80px" style="width:50%">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" style="width:40%" :placeholder="user.username"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="籍贯">
                            <el-input v-model="form.address" style="width:40%" :placeholder="user.address"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-radio-group v-model="form.type">
                                <el-radio label="教师"></el-radio>
                                <el-radio label="学生"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="updata">提交修改</el-button>
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
                /**
                 * 1.绑定element-ui的action属性中,上传文件使用: 即上传路径
                 * */
                imgpath: this.basePath + "/upload/upload",
                form: {
                    name: '',
                    sex: '',
                    address: '',
                    type: ''
                },
                value: "username",
                show1: false,
                show: false,
                input: '',
                type1: '',
                UserSize: 0,
                currentPage: 1,

                tableData: [],
                pageSize: 10,
                pageNo: 1,
                user: '',
            }
        },

        created() {
            /**
             * 生命周期创建时先获取
             */
            this.get(this.pageSize, this.pageNo)
        },
        methods: {
            // 显示修改页面
            cshow(index, row) {
                this.show1 = true;
                this.user = row;
                this.form.sex = row.sex;
                this.from.name = "";
                this.form.address = "";
                if (row.type == 2) {
                    this.form.type = "学生"
                }
                if (row.type == 3) {
                    this.form.type = "教师"
                }

            },
            //显示修改页面
            goBack() {
                this.show1 = false;
            },
            //清除
            clearvalue() {
                this.get(this.pageSize, this.pageNo)
                this.input = '';
                this.value = '';
            },
            //成功提示
            open2(v) {
                this.$message({
                    message: v,
                    type: 'success'
                });
            },
            //警告提示
            open3(v) {
                this.$message({
                    message: v,
                    type: 'warning'
                });
            },
            /**
             * 管理员更改用户信息
             *   u_id:this.user.id,
             username:this.form.name,
             sex:this.form.sex,
             address:this.form.address,
             type:this.type1
             this.show1--隐藏页面
             * */
            updata() {
                if (!this.form.name || !this.form.sex || !this.form.address || !this.form.type) {
                    this.open3("不可为空")
                } else {
                    if (this.form.type == '学生') this.type1 = 2
                    if (this.form.type == '教师') this.type1 = 3
                    this.$axiosjwt({
                        url: "/users/upUserdata",
                        method: "post",
                        data: {
                            u_id: this.user.id,
                            username: this.form.name,
                            sex: this.form.sex,
                            address: this.form.address,
                            type: this.type1
                        }, success:(result)=>{
                        this.open2(result)
                        this.show1 = false
                        this.get(this.pageSize, this.pageNo)
                    }
                })
                }
            },
            /**
             * 分页搜索用户信息
             * ,输入内容
             * this.value,搜素类型
             * 页码大小
             * this.pageNo 当前页数
             * this.tableData列表数据
             *   this.UserSize列表数量
             * */
            select() {
                if (!this.input)  this.open3("请输入要搜索的关键字!!!!!!")
                else{
                    this.$axiosjwt({
                        url:'/admin/getUsersByTypeAndChar',
                        method:'get',
                        data:{
                            type:2,
                            inputText:this.input,
                            CharType:this.value,
                            pageNum:this.pageSize,
                            currPage:this.pageNo-1
                        },
                        success:(result)=>{
                            this.tableData=result.data
                            this.UserSize=result.total
                        }
                    })
                }

            },
            /**
             * 分页获取用户信息
             * @param pageNum
             * @param currPage
             *  this.tableData列表数据
             *   this.UserSize列表数量
             */
            get(pageNum, currPage) {
                this.$axiosjwt({
                    url: '/users/getUsersByTypePage',
                    method: 'get',
                    data: {
                        type: 2,
                        pageNum: pageNum,
                        currPage: currPage - 1
                    },
                    success: (result) => {
                        this.tableData = result.data
                        this.UserSize = result.total
                    }
                })
            },
            /**
             * 删除用户
             * */
            del(index, row) {
                this.$axiosjwt({
                    url: '/users/delUserdata',
                    method: 'get',
                    data: {
                        u_id: row.id
                    },
                    success: (result) => {
                        console.log(this.pageNum)
                        console.log(this.currPage)
                        this.get(this.pageSize, this.pageNo)
                    }
                })

            },
            /**
             * 导入文件操作
             */
            importxlsx() {

                        if (this.$refs.upload.uploadFiles.length==0) this.open3("请选择要导入的文件")
                        else{
                            this.$confirm("将文件导入,是否继续?","提示",{
                                confirmButtonText:"确定",
                                cancelButtonText:'取消',
                                type:'warning'
                            }).then(()=>{

                                this.$axiosjwt({
                                    url:"/users/setXlsxData",
                                    method:'post',
                                    data:{},
                                    success:(result)=>{
                                    this.$message({
                                        type:'success',
                                        message:result
                                    })}})

                            }).catch(()=>{
                                this.$message({
                                    type:'info',
                                    message:'文件导入已经取消'
                                })
                            })
                            this.get(this.pageSize,this.pageNo)
                        }
            },
            /**
             * 弹窗操作(ui框架调用)
             * */
            open(index, row) {
                this.$confirm('此操作将继续, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(index, row);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            /*   onSubmit() {
                   // console.log('submit!');
               },*/
            /**
             * 当每页数量或者当前页数改变时重新获取数字
             * @param val
             */
            handleSizeChange(val) {
                this.pageSize = val;
                //当输入框等不为空搜索,否则全部分页显示
                if (this.input && this.value) {
                    this.select()
                } else {
                    this.get(this.pageSize, this.pageNo)
                }
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                // console.log(`当前页: ${val}`);
                //分页
                if (this.input && this.value) {
                    this.select()
                } else {
                    this.get(this.pageSize, this.pageNo)
                }
            }
        },
    }
</script>

<style scoped lang="scss">

</style>

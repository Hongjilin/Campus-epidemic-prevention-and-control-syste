<template>
  <div class="common">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link tag="a" to="/student/home" class="nav-link">Home</router-link>
        </li>
        <!--<li class="nav-item d-none d-sm-inline-block">-->
        <!--<a href="#" class="nav-link">Contact</a>-->
        <!--</li>-->
      </ul>

      <!-- SEARCH FORM -->
      <!--<form class="form-inline ml-3">-->
      <!--<div class="input-group input-group-sm">-->
      <!--<input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">-->
      <!--<div class="input-group-append">-->
      <!--<button class="btn btn-navbar" type="submit">-->
      <!--<i class="fas fa-search"></i>-->
      <!--</button>-->
      <!--</div>-->

      <!--</div>-->
      <!--</form>-->

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <el-dropdown>
          <span class="el-dropdown-link">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
              <i class="el-icon-s-tools"></i>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>
              <el-button type="text" @click="outlogin">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- Messages Dropdown Menu -->
        <!--<li class="nav-item dropdown">-->
        <!--<a class="nav-link" data-toggle="dropdown" href="#">-->
        <!--<i class="far fa-comments"></i>-->
        <!--<span class="badge badge-danger navbar-badge">3</span>-->
        <!--</a>-->
        <!--<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">-->
        <!--<a href="#" class="dropdown-item">-->
        <!--&lt;!&ndash; Message Start &ndash;&gt;-->
        <!--<div class="media">-->
        <!--<img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">-->
        <!--<div class="media-body">-->
        <!--<h3 class="dropdown-item-title">-->
        <!--Brad Diesel-->
        <!--<span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>-->
        <!--</h3>-->
        <!--<p class="text-sm">Call me whenever you can...</p>-->
        <!--<p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; Message End &ndash;&gt;-->
        <!--</a>-->
        <div class="dropdown-divider"></div>
        <!--<a href="#" class="dropdown-item">-->
        <!--&lt;!&ndash; Message Start &ndash;&gt;-->
        <!--<div class="media">-->
        <!--<img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">-->
        <!--<div class="media-body">-->
        <!--<h3 class="dropdown-item-title">-->
        <!--John Pierce-->
        <!--<span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>-->
        <!--</h3>-->
        <!--<p class="text-sm">I got your message bro</p>-->
        <!--<p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; Message End &ndash;&gt;-->
        <!--</a>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a href="#" class="dropdown-item">-->
        <!--&lt;!&ndash; Message Start &ndash;&gt;-->
        <!--<div class="media">-->
        <!--<img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">-->
        <!--<div class="media-body">-->
        <!--<h3 class="dropdown-item-title">-->
        <!--Nora Silvester-->
        <!--<span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>-->
        <!--</h3>-->
        <!--<p class="text-sm">The subject goes here</p>-->
        <!--<p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; Message End &ndash;&gt;-->
        <!--</a>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a href="#" class="dropdown-item dropdown-footer">See All Messages</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--&lt;!&ndash; Notifications Dropdown Menu &ndash;&gt;-->
        <!--<li class="nav-item dropdown">-->
        <!--<a class="nav-link" data-toggle="dropdown" href="#">-->
        <!--<i class="far fa-bell"></i>-->
        <!--<span class="badge badge-warning navbar-badge">15</span>-->
        <!--</a>-->
        <!--<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">-->
        <!--<span class="dropdown-item dropdown-header">15 Notifications</span>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a href="#" class="dropdown-item">-->
        <!--<i class="fas fa-envelope mr-2"></i> 4 new messages-->
        <!--<span class="float-right text-muted text-sm">3 mins</span>-->
        <!--</a>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a href="#" class="dropdown-item">-->
        <!--<i class="fas fa-users mr-2"></i> 8 friend requests-->
        <!--<span class="float-right text-muted text-sm">12 hours</span>-->
        <!--</a>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a href="#" class="dropdown-item">-->
        <!--<i class="fas fa-file mr-2"></i> 3 new reports-->
        <!--<span class="float-right text-muted text-sm">2 days</span>-->
        <!--</a>-->
        <!--<div class="dropdown-divider"></div>-->
        <!--<a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
        <!--<a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">-->
        <!--<i class="fas fa-th-large"></i>-->
        <!--</a>-->
        <!--</li>-->
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a to="/admin/home" class="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: .8"
        />
        <span v-text="type" class="brand-text font-weight-light"></span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              :src="touxiang"
              class="img-circle elevation-2"
              alt="User Image"
              style="width: 3rem;height: 3rem"
            />
          </div>
          <div class="info">
            <a href="#" v-text="username" class="d-block"></a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <router-link
              tag="li"
              v-for="(item,index) in navActive"
              :key="index"
              class="nav-item"
              :to="item.path"
            >
              <a class="nav-link">
                <i :class="item.icon"></i>
                <p>
                  {{item.title}}
                  <!--<span class="right badge badge-danger">New</span>-->
                </p>
              </a>
            </router-link>
            <li class="nav-item has-treeview">
              <a class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                  聊天
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right">2</span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <router-link tag="li" to="/student/otp" class="nav-item">
                  <a class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>群聊</p>
                  </a>
                </router-link>
                <router-link tag="li" to="/student/oto" class="nav-item">
                  <a class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>私聊</p>
                  </a>
                </router-link>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->

      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h5 class="m-0 text-dark"></h5>
            </div>
            <!-- /.col -->

            <!--<div class="col-sm-6">-->
            <!--<ol class="breadcrumb float-sm-right">-->
            <!--<li class="breadcrumb-item"><a href="#">Home</a></li>-->
            <!--<li class="breadcrumb-item active">Dashboard v1</li>-->
            <!--</ol>-->
            <!--</div>&lt;!&ndash; /.col &ndash;&gt;-->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>

      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content" style="height: 48rem;overflow-y: scroll">
        <div class="container-fluid">
          <el-row style="padding: 10px 10px">
            <el-col :span="24">
              <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </el-row>
        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
      <strong>
        @洪-2020-Version 2.0
        <a href="https://gitee.com/hongjilin">校园疫情防控管理系统</a>.
      </strong>

      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </b>
      </div>
    </footer>
    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      type: "",
      touxiang: "",
      username: "",
      navActive: [
        {
          path: "/student/myNotice",
          title: "我的通知",
          icon: "nav-icon fa fa-user-circle"
        },
        {
          path: "/student/health",
          title: "健康填报",
          icon: "nav-icon fa fa-comments"
        },
        {
          path: "/student/application",
          title: "请假申请",
          icon: "nav-icon fa fa-comments"
        },
        {
          path: "/student/user",
          title: "个人信息",
          icon: "nav-icon fa fa-user-circle"
        }
      ]
    };
  },
  created() {
    /**'
     * 渲染头像名字等
     */
    this.$axiosjwt({
      url: "/users/getUserDataByToken",
      method: "get",
      data: {},
      success: result => {
        if (result.type == 1) this.type = "Admin";
        else if (result.type == 2) this.type = "Student";
        else if (result.type == 3) this.type = "Teacher";
        this.touxiang = this.basePath + "/file/" + result.head;
        this.username = result.username;
      }
    });
  },
  methods: {
    outlogin() {
      window.location.href = "http://localhost:80/#/Login";
    }
  }
};
</script>
<style lang="scss" scoped>
.content::-webkit-scrollbar {
  display: none;
}
</style>

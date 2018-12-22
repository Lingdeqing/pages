<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :router="true"
        default-active="/">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">测试页</span>
        </el-menu-item>
        <el-menu-item index="/config">
          <i class="el-icon-setting"></i>
          <span slot="title">配置页</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <el-scrollbar
          wrap-class="main__wrap"
          view-class="main"
          ref="scrollbar">
          <router-view></router-view>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import Test from './components/test';
import Config from './components/config';

Vue.use(VueRouter);

const STORAGE_KEY = 'ifa_data';
export default {
  name: 'app',
  components: {
    Test,
    Config,
  },
  router: new VueRouter({
    routes: [
      {path: '/', component: Test},
      {path: '/test', component: Test},
      {path: '/config', component: Config},
    ]
  })
}
</script>
<style>
body{margin:0;padding: 0;}
.main__wrap{max-height: calc(100vh - 20px);padding: 10px 20px 10px 0;}
</style>
<style scoped>
.el-container{height: 100vh;}
.el-main{padding:0;}
.el-menu{height: 100%;}
</style>

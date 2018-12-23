<template>
  <el-container>
    <el-aside width="150px">
      <el-menu
        :router="true"
        :default-active="activeIndex">
        <el-menu-item index="/">
          <i class="el-icon-document"></i>
          <span slot="title">接口测试</span>
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
import Test from './components/test';

Vue.use(VueRouter);

export default {
  name: 'app',
  data(){
    return {
      activeIndex: ''
    }
  },
  router: new VueRouter({
    routes: [
      {path: '/', component: Test},
      {path: '/test', component: Test},
    ]
  }),
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(to){
        this.activeIndex = to.path;
      }
    }
  }
}
</script>
<style>
body{margin:0;padding: 0;}
.main__wrap{max-height: calc(100vh - 20px);padding: 10px 20px 10px 10px;}
</style>
<style scoped>
.el-container{height: 100vh;}
.el-main{padding:0;}
.el-menu{height: 100%;}
</style>

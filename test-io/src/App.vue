<template>
  <div id="app">
    <el-form label-width="80px">
      <el-form-item label="baseUrl">
        <el-input v-model="baseUrl"></el-input>
      </el-form-item>
    </el-form>

    <el-form label-width="80px">
      <el-form-item label="接口">
        <el-select v-model="interface1.path" placeholder="请选择">
          <el-option
            v-for="path in interface1.paths"
            :key="path"
            :label="path"
            :value="path">
          </el-option>
        </el-select>
      </el-form-item>

      <div v-for="(item, path) in interfaces" :key="path">
        <template v-if="path === interface1.path">
          <el-form-item v-for="(value, key) in item.params" :key="key" :label="key" >
            <el-input v-model="item.params[key]"></el-input>
          </el-form-item>
        </template>
      </div>

      <el-form-item label="result">
        <el-input type="textarea" v-model="interface1.result" rows="25"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="callInterface1" type="primary">test</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'app',
  data(){
    return {
      baseUrl: 'http://10.234.195.8:9019/monitor10/api/',
      testInterface: '',
      interfaces: {
        getEverydayOpenTimes: {
          method: 'POST',
          params: {
            month: 8,
            year: 2018,
            pageUrl: 'http://home.mi.com/shop/crowdfunding?_rt=weex&pageid=5',
          }
        },
        getTotalOpenTimes: {
          method: 'POST',
          params: {
            month: 8,
            year: 2018,
          }
        },
        getPageUrls: {
          method: 'POST',
          params: {
            month: 8,
            year: 2018,
          }
        },
        getWeexOpenList: {
          method: 'POST',
          params: {
            currentPage: 1,
            pageSize: 10,
          }
        },
      },
      interface1: {
        method: 'POST',
        path: 'getEverydayOpenTimes',
        paths: [
          'getEverydayOpenTimes',
          'getTotalOpenTimes',
          'getPageUrls',
          'getWeexOpenList'
        ],
        params: {
          month: 8,
          year: 2018,
          pageUrl: 'http://home.mi.com/shop/crowdfunding?_rt=weex&pageid=5',
          currentPage: 1,
          pageSize: 10,
        },
        result: ''
      }
    }
  },
  methods: {
    callInterface1(){
      $.post(this.baseUrl + this.interface1.path, {
        ...this.interface1.params,
        // pageUrl: encodeURIComponent(this.interface1.params.pageUrl)
      })
      .then((result) => {
        this.interface1.result = JSON.stringify(result, null, 2);
      })
    }
  }
}
</script>

<style>
</style>

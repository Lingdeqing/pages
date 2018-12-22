<template>
  <div id="test">
    <el-form label-width="120px">
      <el-form-item label="baseUrl">
        <el-input v-model="baseUrl"></el-input>
      </el-form-item>
    </el-form>

    <el-form label-width="120px">
      <el-form-item label="接口" class="baseItem">
        <el-select v-model="testInterface" placeholder="请选择">
          <el-option
            v-for="(item, path) in interfaces"
            :key="path"
            :label="path"
            :value="path">
          </el-option>
        </el-select>
      </el-form-item>

      <template v-for="(item, path) in interfaces">
        <div v-if="path === testInterface" :key="path">
          <el-form-item label="method" class="baseItem">
            <el-select v-model="item.method" placeholder="请选择">
              <el-option
                v-for="(method) in methods"
                :key="method"
                :label="method"
                :value="method">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="超时" class="baseItem">
            <el-input v-model="item.timeout"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item v-for="(value, key) in item.params" :key="key" :label="key" >
            <el-input v-model="item.params[key]"></el-input>
          </el-form-item>
        </div>
      </template>

      <el-form-item label="result" class="clear">
        <el-input type="textarea" v-model="testResult" rows="25"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="callInterface" type="primary" :disabled="!testInterface">test</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import $ from 'jquery';

const STORAGE_KEY = 'ifa_data';
export default {
  name: 'test',
  data(){
    const storage = localStorage.getItem(STORAGE_KEY);
    const defaultData = {
      baseUrl: 'http://10.234.195.8:9019/monitor10/api/',
      testInterface: '',
      testResult: '',
      methods: ['GET', 'POST'],
      interfaces: {
        getEverydayOpenTimes: {
          method: 'POST',
          timeout: 300,
          params: {
            month: 8,
            year: 2018,
            pageUrl: 'http://home.mi.com/shop/crowdfunding?_rt=weex&pageid=5',
          }
        },
        getTotalOpenTimes: {
          method: 'POST',
          timeout: 300,
          params: {
            month: 8,
            year: 2018,
          }
        },
        getPageUrls: {
          method: 'POST',
          timeout: 300,
          params: {
            month: 8,
            year: 2018,
          }
        },
        getWeexOpenList: {
          method: 'POST',
          timeout: 300,
          params: {
            currentPage: 1,
            pageSize: 10,
          }
        },
      }
    };
    const data = storage ? JSON.parse(storage) : defaultData;
    return data;
  },
  methods: {
    callInterface(){
      this.testResult = '';
      const ifa = this.interfaces[this.testInterface];
      $.ajax({
        type: ifa.method,
        url: this.baseUrl + this.testInterface,
        data: ifa.params,
        timeout: ifa.timeout
      })
      .then((result) => {
        this.testResult = JSON.stringify(result, null, 2);
      })
      .catch((e) => {
        this.testResult = e.statusText;
      })
    }
  },
  watch: {
    $data: {
      deep: true,
      handler(){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$data));
      }
    }
  }
}
</script>
<style scoped>
.clear{clear:left;}
.baseItem{float: left;}
</style>

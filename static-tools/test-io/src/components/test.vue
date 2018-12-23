<template>
  <div id="test">
    <el-form label-width="120px">
      <el-form-item label="baseUrl">
        <el-select 
          v-model="testInterface.baseUrl" 
          filterable clearable allow-create 
          default-first-option 
          @change="changeSelectOptions(testInterface.baseUrl, baseUrls)" 
          placeholder="请输入"
          style="width: 100%;">
            <el-option
            v-for="(baseUrl) in baseUrls"
            :key="baseUrl"
            :label="baseUrl"
            :value="baseUrl">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口" class="baseItem">
        <el-select 
          v-model="testInterfaceName" 
          filterable clearable allow-create default-first-option 
          @change="changeInterfaces(testInterfaceName, interfaces)" placeholder="请输入">
            <el-option
              v-for="(item, path) in interfaces"
              :key="path"
              :label="path"
              :value="path">
            </el-option>
        </el-select>
      </el-form-item>

        <el-form-item label="method" class="baseItem">
            <el-select 
              v-model="testInterface.method" 
              filterable clearable allow-create default-first-option 
              @change="changeSelectOptions(testInterface.method, httpMethods)" placeholder="请选择">
                <el-option
                v-for="(method) in httpMethods"
                :key="method"
                :label="method"
                :value="method">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="超时" class="baseItem">
            <el-input v-model="testInterface.timeout" class="param"></el-input>
            <el-button @click.prevent="addParam(testInterface)" type="primary">新增</el-button>
        </el-form-item>
        <div class="clear"></div>
        <el-form-item v-for="(value, key) in testInterface.params" :key="key" :label="key" >
          <el-input 
            slot="label" 
            v-if="testInterface.keyInputVisible === key" 
            v-model="testInterface.keyInputVal" 
            @blur="setParamName(testInterface, key)"
            autofocus
            placeholder="填写键名"></el-input>
          <div slot="label" v-else @click="showKeyInput(testInterface, key)">{{key}}</div>
          <!-- <el-input v-model="testInterface.params[key]" class="param"></el-input> -->
          <el-select 
            v-model="testInterface.params[key]" 
            filterable clearable allow-create default-first-option 
            @change="changeSelectOptions(testInterface.params[key], paramValues[key])" class="param" placeholder="请选择">
              <el-option
              v-for="(value) in paramValues[key]"
              :key="value"
              :label="value"
              :value="value">
              </el-option>
          </el-select>
          <el-button @click.prevent="removeParam(testInterface, key)" type="warning">删除</el-button>
        </el-form-item>

      <el-form-item label="result" class="clear">
        <el-input type="textarea" v-model="testResult" rows="15"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="callInterface" type="primary" :disabled="!testInterface">test</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getTestPageData, setTestPageData, getParamValues} from '../storage';

import $ from 'jquery';

const defaultParam = {
  keyInputVisible: null,
  keyInputVal: '',
  baseUrl: '',
  method: 'POST',
  timeout: 300,
  params: {}
}
export default {
  name: 'test',
  data(){
    return getTestPageData();
  },
  computed: {
      testInterface(){
         if(this.testInterfaceName){
             return this.interfaces[this.testInterfaceName];
         } else {
             return {
               ...defaultParam
            }
         }
      }
  },
  methods: {
    changeSelectOptions(newVal, options){
        if(!options.includes(newVal)){
            options.push(newVal);
        }
    },
    changeInterfaces(newName, interfaces){
      if(!this.interfaces[newName]){
        this.interfaces = {
          ...interfaces,
          [newName]: {
            ...defaultParam
          }
        }
      }
    },
    removeParam(ifa, param){
      const newParams = {
        ...ifa.params
      }
      delete newParams[param];
      ifa.params = newParams;
    },
    addParam(ifa){
      ifa.params = {
        ...ifa.params,
        '': ''
      };
      this.showKeyInput(ifa, '');
    },
    setParamName(ifa, param){
      if(ifa.keyInputVal == ''){
        ifa.keyInputVal = 'newKey'
      }
      if(ifa.keyInputVal !== param && ifa.keyInputVal in ifa.params){
        this.$message.error('字段不可重复')
        return ;
      }
      const newParams = {};
      Object.keys(ifa.params).forEach(key => {
        if(key === ifa.keyInputVisible){
          newParams[ifa.keyInputVal] = ifa.params[key];
        } else {
          newParams[key] = ifa.params[key];
        }
      });
      ifa.params = newParams;
      ifa.keyInputVisible = null;
      ifa.keyInputVal = '';
    },
    showKeyInput(ifa, param){
      ifa.keyInputVisible = param;
      ifa.keyInputVal = param;
    },
    callInterface(){
      this.testResult = '';
      const ifa = this.testInterface;
      const data = {};
      Object.keys(ifa.params).forEach(key => {
        if(key){
          data[key] = ifa.params[key];
        }
      })
      $.ajax({
        type: ifa.method,
        url: ifa.baseUrl + this.testInterfaceName,
        data: data,
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
        setTestPageData(this.$data);
      }
    }
  }
}
</script>
<style scoped>
.el-form-item{margin-bottom: 10px;}
.clear{clear:left;}
.baseItem{float: left;}
.param{width: calc(100% - 81px);margin-right: 10px;}
</style>

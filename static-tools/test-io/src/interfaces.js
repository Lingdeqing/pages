const common = {
  keyInputVisible: null,
  keyInputVal: '',
  timeout: 300,
  baseUrl: 'http://10.234.195.8:9019/monitor10/api/'
}
let interfaces = {
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
    }
}
Object.keys(interfaces).forEach(path => {
    interfaces[path] = {
        ...interfaces[path],
        ...common
    }
})

export default interfaces;
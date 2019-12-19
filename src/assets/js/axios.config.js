import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'

axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = 'b97def70-ddb8-11e9-81f5-fde7740e4c8e'
  } else {
    config.params = {
      token: 'b97def70-ddb8-11e9-81f5-fde7740e4c8e'
    }
  }
  return config
})

axios.interceptors.response.use(res => {
  return res.data.data
}, err => {
  return Promise.reject(err)
})

Vue.prototype.$http = axios

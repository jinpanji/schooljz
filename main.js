import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import http from '@/components/unitls/http.js'
Vue.prototype.$http=http

// Vue.prototype.$imgurl="http://192.168.0.111:3326/"
Vue.prototype.$imgurl="https://request.zhixiangxiaoche.com/"

import "@/components/style/resetm.css"


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

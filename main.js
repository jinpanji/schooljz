import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import http from '@/components/unitls/http.js'
Vue.prototype.$http=http

import "@/components/style/resetm.css"


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

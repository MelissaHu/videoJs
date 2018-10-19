// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'video.js/dist/video-js.css'
import 'video.js/dist/video-js.css'
import './assets/css/common.css'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
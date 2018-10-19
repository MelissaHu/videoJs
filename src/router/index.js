import Vue from 'vue'
import Router from 'vue-router'
import MyVideo from '@/components/MyVideo'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'MyVideo',
        component: MyVideo
    }]
})
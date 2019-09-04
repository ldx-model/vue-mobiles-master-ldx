// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/
import Vue from 'vue'
import App from './App'
// import Vuex from 'vuex'
import store from './store'
import router from './router'
import SvgIcon from'@/components/SvgIcon'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import cookie from 'js-cookie'
import FastClick from 'fastclick'
import '../static/js/flexible.js'
import vantDialog from '@/components/vantDialog'
import thor from 'thor-x'
import 'thor-x/dist/index.css'
import {createWebSocket} from '@/utils/websocket'
Vue.use(thor)
// import {fetchGet,fetchPost} from '@/apiconfig/index.js'
if (process.env.MOCK) {    // 判断是否为mock模式
  require('./mock/index.js')
}
/**
*监听浏览器点击返回前进操作动画
*浏览器端使用需要注意路由path的创建，二级应该在一级的基础上添加
*如一级/Home，则二级为/Home/Detail，依次往后加，如果是app的话可忽略以下代码
*/
const login = cookie.get('token')
login && createWebSocket(function(){
  console.log('dxdxddddddd')
})
let init = 0
window.addEventListener('popstate', function(e) {
  init++
  if (init < 2) {
    router.beforeEach((to, from, next) => {
      let arr1 = to.path.split('/')
      let arr2 = from.path.split('/')
      if (arr1.length === 2) {
        if (arr1[1].length === 0) {
          arr1.splice(1, 1)
        }
      }
      if (arr2.length === 2) {
        if (arr2[1].length === 0) {
          arr2.splice(1, 1)
        }
      }
      if (arr1.length < arr2.length) {
        router.togoback()
      } else {
        router.togoin()
      }
      next()
    })
  }
}, false)

router.beforeEach((to, from, next) => {
  // const isLogin = sessionStorage.getItem('token')
  const isLogin = cookie.get('token')
  if (isLogin) {
      next()
  } else {
    console.log(to.name)
    if (to.path === '/loginpage'||to.path === '/registpage'||to.name === 'experience'||to.name==='Register'||to.name==='Registercom') { //这就是跳出循环的关键
      next()
    } else {
      next('/loginpage')
    }
  } 
})

// app 修改状态栏颜色
// document.addEventListener('plusready', function () {
//   let System = window.plus.os.name
//   if (System === 'iOS') {
//     window.plus.navigator.setStatusBarBackground('#d81e06')
//   }
// })

Vue.use(Vant)
// Vue.use(Vuex)
Vue.component('svg-icon', SvgIcon)
Vue.component('vantDialog', vantDialog)
Vue.config.productionTip = false
FastClick.attach(document.body)
// Vue.prototype.$get = fetchGet
// Vue.prototype.$post = fetchPost

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

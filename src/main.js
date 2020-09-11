import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router/router.js'
//引入vuex 
import store from './store/index.js'


//全局使用
Vue.use(Vant);

//创建一个全局bus 用来跨级传值
Vue.prototype.$bus=new Vue()

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

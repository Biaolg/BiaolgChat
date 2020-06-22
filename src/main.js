import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

//通信sdk
import WebIM from './utils/WebIM';

Vue.config.productionTip = false

String.prototype.compare = function (str) {
  //不区分大小写du
  if (this.toLowerCase() == str.toLowerCase()) {
    return true; // 正确zhi
  } else {
    return false; // 错误dao
  }
};

window.Vue = new Vue({
  router,
  store,
  WebIM,
  render: h => h(App)
}).$mount('#app')

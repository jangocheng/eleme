// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Fastclick from 'fastclick';
import App from './App';
import router from './router';

Fastclick.attach(document.body);
Vue.config.productionTip = false;
// Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import Fastclick from 'fastclick';
import Vuex from 'vuex';
import App from './App';
import router from './router';

Fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedFoods: [],
    goods: [],
  },
  mutations: {
    ADDFOOD() {

    },
    DECREASEFOOD() {
    },
    SELECTEDFOODS() {
      const foods = [];
      this.state.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      this.state.selectedFoods = foods;
    },
  },
  actions: {
    selectedfoods({ commit }) {
      commit('SELECTEDFOODS');
    },
  },
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

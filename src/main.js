// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import a from "./js/util"
import xx from './Map'
import router from './router'

Vue.use(a)
/* eslint-disable no-new */
new Vue({
  el: '#content',
  router,
  template: '<xx/>',
  components: { xx }
})

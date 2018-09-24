import Vue from 'vue'
import SemanticUI from 'semantic-ui-vue';
import App from './App.vue'
import '@/styles/app.less'
import store from './store'
import router from './router'

Vue.use(SemanticUI)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

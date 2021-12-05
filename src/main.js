import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false


import "@fontsource/montserrat"
import 'tailwindcss/tailwind.css'



new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

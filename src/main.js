// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyD2iY3tDoikzpFrWK2H8bY1iKTAWXylP5k',
  authDomain: 'gradex-itss.firebaseapp.com',
  databaseURL: 'https://gradex-itss.firebaseio.com',
  projectId: 'gradex-itss',
  storageBucket: 'gradex-itss.appspot.com',
  messagingSenderId: '840715675275'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

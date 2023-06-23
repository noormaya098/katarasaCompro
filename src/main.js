import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed'
import router from './router'

// import firebase from 'firebase/app'
// import 'firebase/firestore'

Vue.use(VueYouTubeEmbed)
Vue.config.productionTip = false
Vue.use(Vuetify)

// firebase.initializeApp({
//  Configurações do seu app
// })

// export const db = firebase.firestore()

new Vue({
  router,

  vuetify,
  render: h => h(App)
}).$mount('#app')

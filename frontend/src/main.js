import './assets/main.css'

import { createApp } from 'vue'

// Vuetify 3
import { createVuetify } from 'vuetify';
import 'vuetify/styles' 
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue'
import router from './router'

// Api
import apiPlugin from './plugins/api.js';

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(apiPlugin);

app.provide('$api', app.config.globalProperties.$api);

app.mount('#app')

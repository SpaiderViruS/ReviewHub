import './assets/main.css'

import { createApp } from 'vue'

// Vuetify 3
import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'

// Api
import apiPlugin from './plugins/api.js';

const app = createApp(App)

app.use(router);
app.use(vuetify);
app.use(apiPlugin);

app.provide('$api', app.config.globalProperties.$api);

app.mount('#app')

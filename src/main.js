/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


//moment
import moment from 'moment'
import ru from "moment/dist/locale/ru"
moment.locale('ru', ru);


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

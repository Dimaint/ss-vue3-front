/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


//moment
import moment from 'moment'
import ru from "moment/dist/locale/ru"
moment.locale('ru', ru);

import Notifications from '@kyvg/vue3-notification'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(Notifications)

registerPlugins(app)

app.mount('#app')

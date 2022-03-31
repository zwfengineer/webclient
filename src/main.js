import { createApp } from 'vue'
import ClientApp from './ClientApp.vue'
import installElementPlus from './plugins/element'
import axios from 'axios'
import VueAxios from 'vue-axios'
const clientapp = createApp(ClientApp)
installElementPlus(clientapp)
clientapp.use(VueAxios,axios)
clientapp.mount('body')
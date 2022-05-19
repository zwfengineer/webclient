import { createApp } from 'vue'
import ClientApp from './ClientApp.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {Unicon} from './plugins/unicon'
import { Boot } from '@wangeditor/editor'
import {PostButtonMenu} from "@/lib/postbutton"
// 注册到 wangEditor
Boot.registerMenu(PostButtonMenu)
const clientapp = createApp(ClientApp)
clientapp.use(VueAxios,axios)
clientapp.use(Unicon)
clientapp.use(ElementPlus)
clientapp.mount('#app')
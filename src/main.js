import { createApp } from 'vue'
import ClientApp from './ClientApp.vue'
import installElementPlus from './plugins/element'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Unicon from 'vue-unicons'
import * as unicons from 'vue-unicons/dist/icons'
import { Boot } from '@wangeditor/editor'
import {PostButtonMenu} from "@/lib/postbutton"
// 注册到 wangEditor

Boot.registerMenu(PostButtonMenu)


const clientapp = createApp(ClientApp)
installElementPlus(clientapp)
const objArray = [];
    Object.keys(unicons)
    .forEach(
        key => objArray.push(unicons[key])
        );
Unicon.add(objArray)
clientapp.use(VueAxios,axios)
clientapp.use(Unicon)
clientapp.mount('body')
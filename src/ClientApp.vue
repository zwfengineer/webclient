<template>
    <div class="background">
      <component :is="viewcomponent" :back="back"></component>
    </div>                                           
</template>
<script>
import LoginView from './components/LoginView'
import MainView from './components/MainView'
import {toRaw} from '@vue/reactivity'
import {wsclients} from './lib/websocketutil'
import { cookie } from './lib/util'
export default {
  name:'ClientApp',
  components:{
    LoginView,
    MainView
  },
  data(){
    return{
      login:false,
      user:null,
      wsclient:WebSocket
    }
  },
  methods:{
    back(component){
      switch (component.$options.name) {
        case "MainView":
          console.log("MainView back")
        case "LoginView":
          this.Loginback(component)
      }
    },
    Loginback(component){ 
      this.login=true
      this.user=toRaw(component.$data.responsedata)
      cookie.set("Logined",true)
      cookie.set("user",JSON.stringify(toRaw(component.$data.responsedata))) 
      this.connect()
    },
    connect(){
      // 调用websocketutil的wsclients,创建连接并管理
      this.wsclient = wsclients.create("/wsapi")
      this.wsclient.onopen = ()=>{
        console.log("user:",this.user.userName,"connect to server")
      }
      this.wsclient.onmessage = (message)=>{
        console.log(this.user.userName,':',message)
      }
      // window.wsclient =this.wsclient;
    },
  },
  setup(){
  },
  mounted(){
    // 刷新重连
    if (cookie.get("Logined")){
      this.login= true
      this.user = JSON.parse(cookie.get("user"))
      console.log(cookie.get("user"),(this.user))
      this.wsclient = wsclients.create('/wsapi')
    }
    window.vue = toRaw(this)
    addEventListener('logout',()=>{
      console.log("logout Event ::")
      this.user=null
      this.login=null 
    })
    // 调试
  },
  computed:{
    viewcomponent(){
      return this.login?"MainView":"LoginView"
    },
  },
}
</script>

<style>
.background{
  background-image: url('./assets/loginback4.jpg');
  background-position-y: 50%;
  background-repeat: round;
  background-size: 100%;
  min-height: 100vh;
}
*{
  padding: 0;
  margin:0;
}
</style>
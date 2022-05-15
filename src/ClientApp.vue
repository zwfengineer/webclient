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
import { cookie, getuser } from './lib/util'
import {initialize} from "./lib/messagedatabase"
import { loadofflinehistorymessage } from './lib/messagemanager'
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
      cookie.set("User",JSON.stringify(toRaw(component.$data.responsedata))) 
      this.connect()
    },
    connect(){
      // 调用websocketutil的wsclients,创建连接并管理
      this.wsclient = wsclients.create("/wsapi")
      addEventListener('wsmessage',(data)=>{
        // console.log(data.detail)
      })
      // window.wsclient =this.wsclient;
    },
    cleanCookie(){
        cookie.remove("Logined")
        cookie.remove("User")
    }
  },
  setup(){
  },
  mounted(){
    // 刷新重连
    if (cookie.get("Logined")){
      this.user = JSON.parse(cookie.get("User"))
      console.log(cookie.get("User"),(this.user))
      this.connect()
    }
    addEventListener('logout',()=>{
      console.log("logout Event ::")
      this.user=null
      this.login=null 
    })
    addEventListener('wsoffline',(data)=>{
      if(data.detail == '1000'){
        this.user=null
        this.login=null
      }
      if(data.detail == '4000'){
        alert("Waring User Repeat")
        this.user=null
        this.login=null
      }
      if(data.detail == '4003'){
        cookie.remove("Logined")
        cookie.remove("User")
        this.user=null
        this.login=null
        alert(data.detail)
      }
      if(data.detail == '1001'){
        this.user=null
        this.login=null
      }
      if(data.detail == '1006'){
        this.user=null
        this.login=null
      }
    })
    addEventListener('wsonline',()=>{
      this.login=true
      console.log("user:",getuser().userName,"connect to server")
      initialize(getuser().uid)
      loadofflinehistorymessage()
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
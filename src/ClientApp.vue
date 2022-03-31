<template>
    <div class="background">
      <component :is="viewcomponent" :back="loginback"></component>
    </div>                                           
</template>
<script>
import LoginView from './components/LoginView'
import MainView from './components/MainView'
export default {
  name:'App',
  components:{
    LoginView,
    MainView
  },
  methods:{
    loginback(){
      this.login=true
      console.log("loginback",this.login)
    }
  },
  data(){
    return{
      login:false
    }
  },
  setup(){
  },
  computed:{
    viewcomponent(){
      return this.login?"MainView":"LoginView"
    }
  }
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
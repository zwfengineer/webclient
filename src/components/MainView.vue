<template>
    <div class="MainViewbackground">
        <div class="header">
            <topbar 
            :userName="user.userName"
            :uid="user.uid"
            :avatar="user.avatar"
            ></topbar>
        </div>
        <div class="main">
            <div class="left">
                <Menu></Menu>
            </div>
            <div class="center">
                <ChatManager></ChatManager>
            </div>
            <div class="right">
                <span></span>
            </div>
        </div>
        <div class="bottom">
        </div>
    </div>
</template>
<script>
import Topbar from './Topbar.vue'
import { toRaw } from '@vue/reactivity'
import { baseAxios, cookie, logout } from '@/lib/util'
import Friendlist from './Friendlist.vue'
import Menu from "./Menu.vue"
import ChatManager from "./ChatManager.vue"
import { wsclients } from '@/lib/websocketutil'
export default {
    name:'MainView',
    components:{
        Topbar,
        Friendlist,
        Menu,
        ChatManager,
    },
    props:{
        back:null,
        friendlist:null,

    },
    data(){
        return{
            user:Object,
            wsclient:null
        }
    },
    mounted(){
        this.$data.user=toRaw(this.$parent.$data.user)
        this.wsclient = wsclients.create("/wsapi") 
    }, 
    updated(){
    },
    setup(props){
        addEventListener('friendlistevent',data=>{
            props.friendlist = data.detail
        })
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped> 
.MainViewbackground{
    background-color:rgba($color: rgb(238, 232, 232), $alpha: 0.5);
    height: 100vh;
}
.header{
    min-height: 9%;
        background-color: rgb(228, 233, 233);
}
.main{
    background:rgba($color: rgb(204, 204, 241), $alpha: 0.5);
    height: 90%;
    width: 100%;
    display: block;
}
.left{
    // background-color: rgba($color: green, $alpha: 1.0);
    height: 100%;
    width:24%;
    display: inline-block;
    overflow: hidden;
}
.center{
    // background-color: rgba($color: rgb(255, 255, 255), $alpha: 1.0);
    height: 100%;
    width: 50%;
    display: inline-block;
    margin-left: 1%;
    margin-right: 1%;
    overflow: hidden;
}
.right{
    // background-color: rgba($color: rgb(157, 2, 247), $alpha: 1.0);
    height: 100%;
    width: 24%;
    display: inline-block;
    overflow: hidden;
}
.bottom{
    // background-color: rgba($color: #24ff07, $alpha: 0.7);
    width: 100%;
    height: 1%;
}
</style>
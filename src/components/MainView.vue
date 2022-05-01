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
                <span></span>
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
import { wsclients } from '@/lib/websocketutil'
export default {
    name:'MainView',
    components:{
        Topbar,
        Friendlist,
        Menu
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
            console.log(data.detail)
        })
        addEventListener('wsoffline',data=>{
            console.log('catch wsoffline:::',data.detail)
            window.detail = data.detail
        })
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped> 
.MainViewbackground{
    background-color:rgba($color: black, $alpha: 0.5);
    height: 100vh;
}
.header{
    min-height: 10%;
    opacity:initial ;
    background-color: rgb(7, 231, 231);
}
.main{
    background:rgba($color: blue, $alpha: 0.5);
    height: 80vh;
    width: 100%;
    display: block;
}
.left{
    background-color: rgba($color: green, $alpha: 1.0);
    height: 100%;
    width:24%;
    display: inline-block;
    overflow: hidden;
}
.center{
    background-color: rgba($color: rgb(219, 106, 13), $alpha: 1.0);
    height: 100%;
    width: 50%;
    display: inline-block;
    margin-left: 1%;
    margin-right: 1%;
    overflow: hidden;
}
.right{
    background-color: rgba($color: rgb(157, 2, 247), $alpha: 1.0);
    height: 100%;
    width: 24%;
    display: inline-block;
    overflow: hidden;
}
.bottom{
    background-color: rgba($color: #24ff07, $alpha: 0.7);
    width: 100%;
    height: 10%;
}
.header div{
    padding-left: 30px;
    padding-top: 10px;
    width: 20%;
}
</style>
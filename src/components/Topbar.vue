<template>
    <div class="topbar">
        <div class="info">        
            <span>userName:{{userName}}</span>
            <br>
            <span>uid:{{uid}}</span>
        </div>
        <el-avatar :src="avatarsrc"></el-avatar>
        <el-button @click="topbarlogout">Logout</el-button>
    </div>
    
</template>
<script>
import {getavatarsrc,logout} from '@/lib/util'
export default {
    name:'Topbar',
    props:{
        userName:null,
        uid:null,
        avatar:null,
    },
    computed:{
        avatarsrc(){
            return getavatarsrc(this.avatar)
        },
    },
    methods:{
        topbarlogout(){
            console.log(this.userName,"logout service")
            logout()
        }
    }
}
</script>
<style lang="scss" scoped>
.topbar .info{
    display: inline-block;
}
</style>
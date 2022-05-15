<template>
    <div class="topbar">
        <div class="info">        
            <span>{{userName}}</span>
            <br>
            <span>{{uid}}</span>
        </div>
        <span>
            <el-avatar :src="avatarsrc"></el-avatar>
        </span>
    </div>
    <div class="Exit">
        <el-button type="primary" size="default" @click="topbarlogout">
        离开
        </el-button>
        
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
    max-width: 400px;
}
.topbar{
    padding-left: 30px;
    padding-top: 10px;
    width: 20%;
}
.Exit{
    margin-left: 90%;
    margin-top: -25px;
}
</style>
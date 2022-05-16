<template>
    <div @click="read" class="friend">
        <div class="item">
            <span>{{friend?.username}}</span>
        </div>
        <div class="pops" v-if="unreadnum!=0">
            <span>
                {{unreadnum}}
            </span>
        </div>
    </div>
</template>
<script>
import { Friend } from "@/lib/Friend";
import { ref } from "vue";
export default {
    name:"Friend",
    props:{
        friend:Friend
    },
    setup(){
        let unreadnum=ref(10);
        const addunreadnum=function (data){
            unreadnum.value = unreadnum.value+data;
        }
        const cleanunreadnum= function (){
            unreadnum.value = 0;
        }
        const read=function(){
            unreadnum.value=0;
        }
        return{
            read,
            unreadnum,
            cleanunreadnum,
            addunreadnum,
        }
    },
    mounted(){
        addEventListener("newmessageevent",(data)=>{
            if(data.detail.id == this.friend?.id){
                this.addunreadnum(data.detail.unreadnum)
            }
        })
    }
}

</script>
<style lang="scss" scoped>
    .pops{
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        color: white;
        margin-left: 80%;
        margin-top: -20px;
    }
    .item{
        display: inline-block;
        width: 100%;
    }
    .friend{
        overflow: hidden;
        height: 20px;
    }
</style>
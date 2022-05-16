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
<script lang="ts">
import { Friend } from "@/lib/Friend";
import { defineComponent, ref } from "vue";
export default defineComponent({
    name:"Friend",
    props:{
        friend:Friend
    },
    setup(props){
        let unreadnum=ref(10);
        const addunreadnum=function (data:number){
            unreadnum.value = unreadnum.value+data;
        }
        const cleanunreadnum= function (data:number){
            unreadnum.value = 0;
        }
        const read=function(){
            unreadnum.value=0;
        }
        addEventListener("newmessageevent",(data:CustomEventInit)=>{
            if (data.detail.id == props.friend?.id){
                addunreadnum(data.detail.unreadnum)
            }
        })

        return{
            read,
            unreadnum,
            cleanunreadnum,
            addunreadnum,
        }
    }
})
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
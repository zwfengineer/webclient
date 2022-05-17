<template>
    <div @click="cleanunreadnum" class="friend">
        <div class="item">
            <span>{{friend?.username}}</span>
        </div>
        <div class="pops" v-if="unreadnum!=0 && (!active)">
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
    name:"Frienditem",
    props:{
        friend:Friend,
    },
    setup(props){
        let unreadnum=ref(0);
        let active = ref(false);
        const addunreadnum=function (data){
            if(! active.value){
                unreadnum.value = unreadnum.value+data;
            }
        }
        const cleanunreadnum= function (){
            unreadnum.value = 0;
        }
        return{
            unreadnum,
            cleanunreadnum,
            addunreadnum,
            active
        }
    },
    mounted(){
        addEventListener("newmessageevent",(data)=>{
            if(data.detail.id == this.friend.id){
                this.addunreadnum(data.detail.unreadnum)
            }
        })
        addEventListener("changefriend",(data)=>{
            if(data.detail.id != this.friend.id){
                this.active = false;
            }else {
                if(data.detail.id == this.friend.id){
                    this.active=true;
                    this.cleanunreadnum();
                }
            }
        })
        addEventListener("sessionDestory",(data)=>{
            if(data.detail.data == this.friend.id){
                this.active=false
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
<template>
<div :style="showsession">
    <el-tabs 
    v-model="activename"
    @tab-click="handleClick"
    @tab-remove="closesession"
    type="border-card"
    class="tabs"
    >
        <el-tab-pane 
        v-for="(value) of sessions"
        :name = "value[0]" 
        :key = "value[1]" 
        closable
        
        >
        <template  #label>
                {{value[1].name}}
        </template>
                <Chat
                :friend="value[1]"
                ></Chat>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import {activeSessions, clearall, Session, sessionDestory} from '@/lib/sessionmanager'
import Chat from '@/components/Chat.vue';
import { toRaw } from '@vue/reactivity'
export default {
    name:"ChatManager",
    data(){
        return{
            sessions:null,
            activename:{
              type:Number  
            },
            sessionactive:false
        }
    },
    components:{
        Chat
    },
    setup() { 
        console.log("setup")
        activeSessions.clear()
    },
    mounted(){           
        this.sessions = activeSessions
        addEventListener('sessionActive',(data)=>{
            this.sessionactive = true
            this.activename=data.detail
        })        
        addEventListener('sessionDestory',(data)=>{
            if(data.detail.data == this.activename ){
                if(data.detail.index > activeSessions.size){  
                    activeSessions.forEach((value,key)=>{
                        this.activename = key
                    })
                }
                if (data.detail.index == 1){
                    this.activename = this.first()
                }
                if(data.detail.index !=1 && data.detail.index <= this.sessions.size){
                    this.activename = this.next(this.activename)
                }
            }
        })
        console.log(activeSessions) 
        addEventListener("logout",()=>{
            activeSessions.clear()
        })
        
    },
    methods:{
        closesession(data){
            let index = this.index(data)
            this.sessions.delete(data)
            
            dispatchEvent(sessionDestory({
                data:data,
                index:index
            }))
            if(this.sessions.length<=0){            
                this.sessionactive = false
            }
            // 删除元素
        },
        index(data){
           let index = 1
           for (let key of activeSessions.keys()){
               if (key == data){
                   break
               }else{
                   index=index+1
               }
           } 
           return index
        },
        first(){
            for(let key of activeSessions.keys()){
                return key
            }
        },
        next(fillter){
            let index = 1
            for(let key of activeSessions.keys()){
                index = index +1
                if (index == fillter){
                    return key
                }
            }
            
        }
    },
    computed:{
        showsession(){
            return this.sessionactive?"display:block":"display:none"
        }
    }
}
</script>
<style scoped>
    .tabs > .el-tabs__content > .el-tab-pane{
        height: 70vh;
    }
    .tabs{
        height: 80vh;
    }
</style>
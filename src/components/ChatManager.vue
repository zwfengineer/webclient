<template>
<div :style="showsession" class="chatmanager">
    <el-tabs 
    v-model="activename"
    @tab-click="handleClick"
    @tab-remove="closesession"
    @tab-change="sessionchange"
    class="tabs"
    >
        <el-tab-pane 
        v-for="(value) of sessions"
        :name = "value[0]" 
        :key = "value[1]" 
        closable
        
        >
        <template  #label>
            <span>{{value[1].name}}</span>
        </template>
                <Chat
                :session="value[1]"
                ></Chat>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import {activeSessions, sessionDestory} from '@/lib/sessionmanager'
import Chat from '@/components/Chat.vue';
import { changefriend } from '@/lib/CustomEvent';
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
            
        },
        sessionchange(data){
            dispatchEvent(
                changefriend({id:data})
            )
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
    .tabs{
        height: 100vh;
        padding:4px;
    }
    .tabs > .el-tabs__content > .el-tab-pane{
        height: 90vh;
    }
    .tabs::v-deep .el-tabs__header{
        margin-bottom: 0;
    }
    .tabs::v-deep .el-tabs__item{
        height: 20px;
        bottom: 10px;
    }
    .chatmanager{
        height: 100vh;
    }
</style>
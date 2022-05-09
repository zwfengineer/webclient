<template>
<div :style="showsession">
    <el-tabs 
    v-model="activename"
    @tab-click="handleClick"
    @tab-remove="closesession"
    type="border-card"
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
            <div>
                <SpeakBubbles
                :session="value[1]">
                </SpeakBubbles>
            </div>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import {activeSessions, clearall, Session, sessionDestory} from '@/lib/sessionmanager'
import SpeakBubbles from './SpeakBubbles.vue'
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
        SpeakBubbles
    },
    setup() { 
        console.log("setup")
        clearall()
    },
    mounted(){           
        this.sessions = activeSessions
        addEventListener('sessionActive',(data)=>{
            this.sessionactive = true
            this.activename=data.detail
            console.log(
                'sessionactive',
                this.sessionactive,
                data.detail)
        })        
        addEventListener('sessionDestory',(data)=>{
            if(data.detail.data == this.activename ){
                console.log(data.detail.index)
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
        setInterval(() => {
            let num = activeSessions.size+1
            let session = new Session("b"+num,num)
            session.active()
            console.log(activeSessions)
        }, 100000)        
        for(let i = 1;i<6;i++){
            let session = new Session("a"+i,i)
            session.active()
        }
        console.log(activeSessions) 
        
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
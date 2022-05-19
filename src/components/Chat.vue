<template>
<div style="height: 100%;width: 100%;">
<div class ="message" v-show="messagevisible">
    <div v-for="message in messages">
    <SpeakBubbles
    :message="message"
    >
    <template #avatar  v-if="message.from == this.session.friend.id">        
        <el-avatar :src="getavatarsrc(this.session.friend.avatar)"></el-avatar>
    </template>
    <template #avatar v-if="message.from != this.session.friend.id">        
        <el-avatar :src="getavatarsrc(this.session.user.avatar)"></el-avatar>
    </template>
    </SpeakBubbles>
    </div>
</div>
<div class="inputbox">
    <FullTextEditor
    :send="send"
    ></FullTextEditor>
</div>
</div>

</template>

<script>
import SpeakBubbles from '@/components/SpeakBubbles.vue';
import FullTextEditor from './FullTextEditor.vue';
import {getavatarsrc} from "@/lib/util"
export default {
    name:"Chat",
    data() {
        return {
            username:null,
            friendname:null,
            messages:null,
            inputmessage:null,
            hasunread:false,
            messagevisible:true,
        }
    },
    components:{
    SpeakBubbles,
    FullTextEditor
    },
    props:{
        session:null
    },
    mounted() {
        this.messages = this.session.messages
        addEventListener('updatechat',()=>{
            this.$forceUpdate()
        })
        addEventListener("newmessageevent",(data)=>{
            if(data.detail.id == this.session.id){
                this.hasunread = true
            }
        })
        addEventListener("changefriend",(data)=>{
            if((data.detail.id == this.session.id )&&( this.hasunread)){
                this.hasunread = false;
                setTimeout(()=>{
                    // 等一秒在飞滚动条，messsage实际上不在可视区域，scrollHeight为零
                    let message = this.$parent.$el.getElementsByClassName('message')[0];
                    message.scrollTo(0,message.scrollHeight)
                },1)
            }
        })
    },
    methods: {
        send(data){
            this.session.send(data)
        },
        getavatarsrc(data){
            return getavatarsrc(data)
        }
    },
}
</script>
<style scoped> 
.message{
    height: 50%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-image: url(../assets/space.jpg);
    background-position-x: center;
    /* background-color: green; */

}
.inputbox{
    height: 50%;
    border-top-width: 1px;
    border-top-style: solid;
    /* background-color: blue; */
}

</style>
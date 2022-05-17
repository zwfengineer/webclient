<template>
    <div class="friendlistbox">    
        <!-- <li v-for = "friend in friendlist" :key="friend" @click="opensession(friend)">
            {{friend.username}}
        </li>  -->
        <FriendItem
        v-for="friend in friendlist"
        :friend="friend"
        @click="opensession(friend)"
        ></FriendItem>
        <div v-if="nofriends">
            <span>没得好友！</span>
        </div>
        <NoticeList></NoticeList>
    </div>
</template>
<script>
import {getfriendlist} from '@/lib/axiosutil'
import { Session,activeSessions } from '@/lib/sessionmanager'
import { ElMessage } from 'element-plus'
import NoticeList from './NoticeList.vue'
import FriendItem from './FriendItem.vue'
export default {
  components: { NoticeList, FriendItem },
    name:"Friendlist",
    data(){
        return{
            friendlist:null,
            nofriends:true
        }
    }, 
    mounted(){
        this.getdata()
        addEventListener("flushfriendlist",()=>{
            this.getdata()
        })
        addEventListener('addfriendevent',()=>{
            this.getdata()
            ElMessage.success({
                message:"有新朋友加入！"
            })
        })
    },
    methods:{
        getdata(){
            getfriendlist((data)=>{
                if(data!=null){
                    this.friendlist = data 
                    this.nofriends=false
                }else{
                    this.nofriends=true
                }
            })
        },
        opensession(friend){
            if (activeSessions.has(friend.id)){
                activeSessions.get(friend.id).active()
            }else{
                let session = new Session(friend)
                session.active()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.friendlist{
    padding: 0;
    margin:0;
    display: inline-block;
}
.friendlistbox{
    border-style: solid;
    border-width: 1px;
    height: 100%;
}

</style>
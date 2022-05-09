<template>
    <div class="friendlistbox">    
        <li v-for = "friend in friendlist" :key="friend">
            {{friend.username}}
        </li>  
        <div v-if="nofriends">
            <span>没得好友！</span>
        </div>
        <NoticeList></NoticeList>
    </div>
</template>
<script>
import {getfriendlist} from '@/lib/axiosutil'
import NoticeList from './NoticeList.vue'
export default {
  components: { NoticeList },
    name:"Friendlist",
    data(){
        return{
            friendlist:null,
            nofriends:true
        }
    }, 
    mounted(){
        getfriendlist((data)=>{
            console.log("Friendlist:23:",data)
            if(data!=null){
                this.friendlist = data 
                this.nofriends=false
            }else{
                this.nofriends=true
            }
            
        })
    },
    methods:{
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
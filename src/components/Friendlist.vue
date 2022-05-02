<template>
    <div class="friendlistbox">    
        <li v-for = "friend in friendlist" :key="friend">
            {{friend.username}}
        </li>  
        <div v-if="nofriends">
            <span>没得好友！</span>
        </div>
    </div>
</template>
<script>
import {getfriendlist} from '@/lib/axiosutil'
export default {
    name:"Friendlist",
    data(){
        return{
            friendlist:null,
            nofriends:true
        }
    }, 
    mounted(){
        getfriendlist((data)=>{
            console.log(1,data)
            if(data!=null){
                this.friendlist = data 
                this.nofriends=false
            }else{
                this.nofriends=true
            }
            
        })
    },
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
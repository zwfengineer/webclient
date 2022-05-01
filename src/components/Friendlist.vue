<template>
    <div class="friendlistbox">    
        <li v-for = "friend in friendlist" :key="friend">
            {{friend.username}}
        </li>  
    </div>
</template>
<script>
import {getfriendlist} from '@/lib/axiosutil'
export default {
    name:"Friendlist",
    data(){
        return{
            friendlist:null 
        }
    }, 
    mounted(){
        getfriendlist((data)=>{
            this.friendlist = data 
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
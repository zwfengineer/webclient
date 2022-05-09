<template>
<div>
    <li :key="notice" v-for="notice in noticelist">
        
    </li>
</div>
</template>

<script>
import { getAddFriendList } from '@/lib/axiosutil'
export default {
    name:"NoticeList",
    data(){
        return{
            noticelist:null
        }
    },
    setup() {

    },
    mounted(){
        getAddFriendList((data)=>{
            this.noticelist = data
        })
    }
}
</script>
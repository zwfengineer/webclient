<template>
<span class="title">好友申请</span>
<div v-if="noticevisible">
    <Notice :notice="notice" v-for="notice in noticelist"></Notice>
</div>
<div v-if="!noticevisible">
    暂无申请
</div>
</template>

<script>
import { getAddFriendList } from '@/lib/axiosutil'
import { ElMessage } from 'element-plus';   
import Notice from './Notice.vue'
export default {
    name: "NoticeList",
    components: { Notice },
    data() {
        return {
            noticelist: new Array(),
        };
    },
    setup() {
    },
    mounted() {
        this.getdata()
        addEventListener("flushnotice",()=>{
            this.getdata()
        })
        addEventListener("repeataddfriendrequestevent",()=>{
            ElMessage.success({
                message: "收到新的添加好友申请",
                type:"success"
            })
            this.getdata()
        })
    },
    methods: {
        getdata(){
            getAddFriendList((data) => {
                this.noticelist = data;
            });
        }
    },
    computed:{
        noticevisible(){
            if (this.noticelist.length>0 || this.noticelist == null){
                return true
            }else{
                return false
            }
        }
    }
}
</script>
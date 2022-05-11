<template>
    <div @click="clicknotice">
        <el-avatar 
        size="small" shape="circle" fit="fill">
        </el-avatar>
        <span>来自{{notice.fname}}的好友申请</span>
    </div>
    <div>
        <el-dialog
            :title="notice.fname"
            v-model="diavisible"
            width="30%"
            >
            <div>
                {{notice.data}}
            </div>
            <template #footer>
            <span>
                <el-button @click="diavisible = false">忽略</el-button>
                <el-button type="primary" @click="agree">同意</el-button>
            </span>
            </template>
        </el-dialog>
        
    </div>
</template>
<script>
import { ElMessage } from "element-plus"
import {agreeAddFriendRequest} from "../lib/axiosutil"
import{flushnotice} from "../lib/util"
export default {
    name:"Notice",
    data() {
        return {
            diavisible:false,
        }
    },
    props:{
        notice:null,
    },
    setup(props) {
        
    },
    methods: {
        clicknotice(){
            this.diavisible=true
        },
        agree(){ 
            let data = this.notice.from
            agreeAddFriendRequest(data,(data)=>{
                this.diavisible = false
                ElMessage.success({
                    message: "添加"+this.notice.fname+"成功",
                    type:"success"
                })
                dispatchEvent(flushnotice())
            })
        }
    },
}
</script>
<style scoped>
    
</style>
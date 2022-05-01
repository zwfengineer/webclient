<template>
    <el-dialog
    v-model="dialogVisible"
    title="添加友好用户"
    width="85%"
    :before-close="handleClose"
    >
    <div style="margin-bottom: 30px">
      <span>你可以输入用户名或UID 进行搜索</span>
    </div>
    <div>
        <el-input 
        v-model.trim="searchdata"
        @keyup.enter = "search"
        >
        <template #prefix>
          <unicon name="search" fill="blue" style="margin-top: 7px" ></unicon>
        </template>
        </el-input>
        <el-table 
        ref="tableref" 
        :data="tabledata"
        highlight-current-row 
        @current-change="addfriend"
        border 
        style="width:100%; max-height:100vh;">
          <el-table-column prop="username" label="名称"></el-table-column>
          <el-table-column prop="uid" label="id"></el-table-column>
          <el-table-column v-if="tabledata!=null" width="80px">
            <el-button type = "primary"><unicon name = "plus" fill="blue"></unicon></el-button>
          </el-table-column>
        </el-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button  type="primary" @click="addfriend">添加好友</el-button> -->
        <el-button @click="dialogVisible = false" >Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {toRaw, watch} from '@vue/runtime-core';
import {searchFriends} from '@/lib/axiosutil';
import { cookie } from '@/lib/util';
export default {
    name:'AddFriends',
    components:{

    },
    data(){
      return{
        dialogVisible:false,
        searchdata:"",
        entered:false,
        tabledata:null,
      }
    },
    setup(){
    },
    methods:{
      handleClose(done) {
      },
      search(){
        console.log("ENTER",this.entered)
        if ( (! this.entered) & this.searchdata != ""){
          this.entered = true
          let jsondata = {"userName":this.searchdata}
          searchFriends(jsondata,(data)=>{
            if (data != 'null'){
              this.tabledata = this.filterself(data)
            }
            this.entered = false
          })
        }
      },
      addfriend(row){
         
      },
      // 过滤自己
      filterself(data){
        let user = JSON.parse(cookie.get("user"))
        let friends = new Array();
        for(let friend of data){
          if (friend.uid != user.uid){
            friends.push(friend) 
          }
        }
        return friends
      }
    },
    mounted(){
      this.dialogVisible = true
      watch(()=>this.dialogVisible,()=>{
        if(! this.dialogVisible){
          dispatchEvent(new Event("AddFriendsClose"))
        }
      })
    },
}
</script>
<style lang="scss" scoped>
</style>
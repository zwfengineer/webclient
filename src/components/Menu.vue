<template>
        <div class="menu">  
            <div class="menupanel">
                <tag id="Friendlist" @click="click">
                <unicon name="user" fill="white" />
                </tag>
                <tag id="GroupList" @click="click">
                <unicon name="users-alt" fill="white"/>
                </tag>
                <tag id="AddFriends" @click="click">
                <unicon name="plus" fill="white"/>
                </tag>
                <tag id="setting" @click="click">
                <unicon name="setting" fill="white"/>
                </tag>
            </div>
            <component :is="viewcomponent"></component>
        </div>
</template>
<script>
import Friendlist from "./Friendlist.vue"
import AddFriends from "./AddFriends.vue"
import GroupList from "./GroupList.vue"
export default {
    name:"Menu",
    components:{
        Friendlist,
        AddFriends,
        GroupList,
    },
    data(){
        return {
            viewcomponent:"Friendlist",
        }

    },
    setup() {

    },
    methods:{
        click(){
            this.viewcomponent = event.currentTarget.id
            console.log(this.viewcomponent)
        }
    },
    mounted(){
        addEventListener("AddFriendsClose",()=>{    
            this.viewcomponent="Friendlist"
        })
    }
}
</script>
<style lang="scss" scoped>
.menupanel{
    width: 100%;
    white-space: nowrap;
    display: inline-block;
}
.unicon{
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width:25%;
    text-align: center;
    box-sizing: border-box;
}
.menu{
    margin-left: 20%;
    margin-top: 5%;
    height: 100%;
}
</style>
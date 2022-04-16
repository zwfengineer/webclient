<template>
    <div>    
        <li v-for = "friend in friendlist" :key="friend">
            {{friend.username}}
        </li>
    </div>
</template>
<script>
export default {
    props:{
        getfriends:null,
        friendlist:null
    },
    mounted(){
        this.getfriends()
    },
}
</script>

<style lang="scss" scoped>
.friendlist{
    padding: 0;
    margin:0;
    display: inline-block;
}
div{
    margin-left: 20%;
    margin-top: 5%;
}
</style>
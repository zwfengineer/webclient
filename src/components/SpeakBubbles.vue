<template>
<div style="display:inlineblock">
    <div class="avatar">
        <el-avatar
        size="small">
        </el-avatar>
        {{session.name}}
    </div>
    <div class="bubbles">
        <div>{{session.id}}11454144444444444</div>
    </div>
</div>
</template>

<script>
export default {
    name:"SpeakBubbles",
    props:{
        session:null
    },
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>
.bubbles{                
    min-height:24px;
    border:1px solid rgb(8, 0, 255);
    background-color: rgb(188, 187, 233);
    border-radius:20px;    
    margin-left: 60px;
    padding: 10px 10px;
    vertical-align: middle;
    word-wrap: break-word;
    text-align: center;
}
.bubbles div{
    text-align: left;
}
.avatar{
    min-width: 25%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
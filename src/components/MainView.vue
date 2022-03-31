<template>
    <div class="MainViewbackground">
        <div class="header"></div>
        <div class="main">
            <div class="left"></div>
            <div class="center"></div>
            <div class="right"></div>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
export default {
    name:'MainView',
    props:{
        back:null
    },
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>
.MainViewbackground{
    background-color:rgba($color: black, $alpha: 0.5);
    height: 100vh;
    background-image: url();
}
.header{
    height: 10%;
    opacity:initial ;
    background-color: rgb(7, 231, 231);
}
.main{
    background:rgba($color: blue, $alpha: 0.5);
    height: 80%;
}
.left{
    background-color: rgba($color: green, $alpha: 1.0);
    height: 100%;
    width:24%;
    display: inline-block;
}
.center{
    background-color: rgba($color: rgb(219, 106, 13), $alpha: 1.0);
    height: 100%;
    width: 50%;
    display: inline-block;
    margin-left: 1%;
    margin-right: 1%;
}
.right{
    background-color: rgba($color: rgb(157, 2, 247), $alpha: 1.0);
    height: 100%;
    width: 24%;
    display: inline-block;
}
.bottom{
    background-color: rgba($color: #24ff07, $alpha: 0.7);
    width: 100%;
    height: 10%;
}
</style>
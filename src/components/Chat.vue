<template>
<div class ="message">
    <div v-for="message in messages">
    <SpeakBubbles
    :message="message"
    ></SpeakBubbles>
    </div>
</div>
<div class="inputbox">
    <FullTextEditor
    :send="send"
    ></FullTextEditor>
</div>
</template>

<script>
import SpeakBubbles from '@/components/SpeakBubbles.vue';
import FullTextEditor from './FullTextEditor.vue';
export default {
    name:"Chat",
    data() {
        return {
            username:null,
            friendname:null,
            messages:null,
            inputmessage:null,
        }
    },
    components:{
    SpeakBubbles,
    FullTextEditor
},
    props:{
        friend:null
    },
    mounted() {
        
    },
    methods: {
        send(data){
            console.log(data);
        }
    },
}
</script>
<style scoped> 
.message{
    height: 50%;
    /* background-color: green; */

}
.inputbox{
    height: 50%;
    border-top-width: 1px;
    border-top-style: solid;
    /* background-color: blue; */
}

</style>
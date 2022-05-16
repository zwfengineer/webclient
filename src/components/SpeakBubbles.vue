<template>
<div :style="SpeakBubblesStyle">
    <div class="avatar" >
        <el-avatar
        size="small">
        </el-avatar>
    </div>
    <div class="idbox" >
    <span>
         {{message.from}}
    </span>
    </div>
    <div class="bubbles" :style="bubblesStyle"> 
        <Editor
            :defaultConfig="editorConfig"
            :model-value="bubblesText"
            :mode="mode"
            @onCreated="handleCreated"
        />
    </div>
    <div class="tag" style="height:1px;"></div>
</div>
</template>

<script>
import { getuser } from "@/lib/util"
import { Base64 } from "js-base64"
import{shallowRef,ref} from "vue"
import { Editor} from '@wangeditor/editor-for-vue';
export default {
    name:"SpeakBubbles",
    components:{
        Editor
    },
    data() {
        return {
            avatarStyle:null,
            bubblesStyle:null,
            SpeakBubblesStyle:null,
        }
    },
    props:{
        message:null,
    },
    setup(props) {
        const editorRef = shallowRef();
        const handleCreated = (editor) => {
            editorRef.value = editor
        }
        const editorConfig={
            readOnly:true
        }
        const bubblesText = ref(Base64.decode(props.message.data))

        return {
            handleCreated,
            editorConfig,
            mode:"default",
            editorRef,
            bubblesText
        }
    },
    mounted() {
        this.bubblesText = Base64.decode(this.message.data)
        if(this.message.from == getuser().uid){
            this.SpeakBubblesStyle={
                "max-width": "98%",
                "text-align": "right"
            }
            this.bubblesStyle={
                "margin-right":"10px"
            }
        }else{
            this.SpeakBubblesStyle={
                "max-width": "98%",
                "text-align": "left"
            }
            this.bubblesStyle={
                "margin-left":"10px"
            }
        }
    },
    updated() {
        window.$el = this.$el
        this.$el.getElementsByClassName("tag")[0].scrollIntoView(false)
    },
}
</script>
<style lang="scss" scoped>
.bubbles{                
    min-height:24px;
    vertical-align: middle;
    text-align: left;
    word-wrap: break-word;
    display: inline-block ;
    max-width: 90%;
}
.avatar{
    min-width: 25%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.bubbles ::v-deep .w-e-text-container{
    /* background-color: rgb(216, 216, 255); */
    border:1px solid rgb(8, 0, 255);
    border-radius:20px;   
} 
.bubbles::v-deep p:nth-child(1){ 
    margin-top:2px;
    margin-bottom: 0;
}
.bubbles::v-deep p:nth-last-child(1){ 
    margin-bottom:0;
    margin-top: 2px;
}
.bubbles::v-deep p{
    margin:0;
    white-space:pre-wrap;
    word-break: break-all;
}
</style>
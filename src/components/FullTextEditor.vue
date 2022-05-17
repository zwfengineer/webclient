<template>
      <div style="border: 1px solid #ccc;height: 100%;">
        <div class="menu">
          <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            style="border-bottom: 1px solid #ccc;min-width: 350px;height: 40px;"
          />
          <Editor
            :defaultConfig="editorConfig"
            :mode="mode"
            v-model="valueHtml"
            style="height: 240px; overflow-y: clip;"
            @onCreated="handleCreated"
            @onChange="handleChange"
            @onFocus="handleFocus"
            @customPaste="customPaste"
          />
    </div>
  </div>


</template>

<script>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { Editor, Toolbar} from '@wangeditor/editor-for-vue';
import{ElMessage} from 'element-plus'
export default {
  components: { Editor, Toolbar },
  props:{
      send:null
  },
  setup(props) {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();
     
    // 内容 HTML
    const valueHtml = ref('');

    const toolbarConfig = {
        toolbarKeys:[
            "postbutton",
            "bold",
            "underline",
            "italic",
            "emotion",
            "insertLink",
            {
                "key": "group-image",
                "title": "图片",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
                "menuKeys": [
                    "insertImage",
                    "uploadImage"
                ]
            },
            {
                "key": "group-video",
                "title": "视频",
                "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z\"></path></svg>",
                "menuKeys": [
                    "insertVideo",
                    "uploadVideo"
                ]
            },
            "insertTable"
            
        ]
    };
    

    const editorConfig = { 
        placeholder: '请输入内容...' ,
        maxLength:1000,
        MENU_CONF:{}
    };
    editorConfig.MENU_CONF['uploadImage']={
      server:''
    }
    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
      editor.on("postbuttonclick",()=>{
        post()
      })
    };
    const handleFocus = (editor) => {
    };
    const customPaste = (editor, event, callback) => {
      // 自定义插入内容
      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(true); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    }; 
    const post = ()=>{
        let editor = editorRef.value;
        if(editor!=null){
          let data = editor.getText()
            if(data.trim()!=''){
              props.send(editor.getHtml())
              editor.select([])
              editor.deleteFragment()
            }else{
                ElMessage.success({
                    message:"不要发送空串",
                    type:"success"
                })
            }
        }
    }
    const handleChange = (editor) => {
    };
    return {
      editorRef,
      mode: 'default',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleFocus,
      customPaste,
      post,
      handleChange
    };
  },
};
</script>

<style scoped>
.menu{
  height: 90%;
  overflow-x:scroll;
  overflow-y: hidden;
}
.menu::v-deep .w-e-bar-item button{
  padding:0 4px
}
.menu::v-deep .w-e-bar-item-group .w-e-bar-item-menus-container{
  margin-top: 30px;
}
.menu::v-deep .w-e-drop-panel{
    margin-left: -90px;
    height: 30vh;
    overflow-y: scroll;
}
</style>
import {  DomEditor, t } from '@wangeditor/core'
// 定义菜单 class
class PostButton{
  title:string = t("发送")
  tag:string = "button"
  constructor(){
    this.title = t("发送")
    this.tag = "button"
  }
  getValue(editor:any){
    return ''
  }
  isActive(editor:any){
    const node = DomEditor.getSelectedNodeByType(editor,'postbutton')
    return !!node
  }
  isDisabled(editor:any){
    if (editor.getHtml() !=null){
      return false
    }else{
      return true 
    }
  }

  exec(editor:any){
    editor.emit("postbuttonclick")
  }
    // 菜单配置，参考“引用”菜单源码
}

// 定义菜单配置

const PostButtonMenu = {
  key: 'postbutton', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new PostButton()
  },
}

export{
  PostButtonMenu,
}
// 注册到 wangEditor


import { IButtonMenu, IDomEditor } from '@wangeditor/core'


// 定义菜单 class
class postbutton implements IButtonMenu {
    title: "发送"
    iconSvg?: string
    hotkey?: string
    alwaysEnable?: boolean
    tag: string
    width?: number
    getValue: (editor: IDomEditor) => string | boolean
    isActive: (editor: IDomEditor) => boolean
    isDisabled: (editor: IDomEditor) => boolean
    exec: (editor: IDomEditor, value: string | boolean) => void
    // 菜单配置，参考“引用”菜单源码
}

// 定义菜单配置
export const menu1Conf = {
  key: 'postbutton', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new postbutton()
  },
}

// 注册到 wangEditor

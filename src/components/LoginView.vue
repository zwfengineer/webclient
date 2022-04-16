<template> 
<div id='loginpadding'>
    <div class="loginbox" :style="loginboxstyle">
        <div class="title">
            <span>{{data.title}}</span>
            <div class="imageavatar">
                <el-avatar :size="50" :src="data.user.image"></el-avatar>
            </div>
        </div>
        <div :style='data.loginstyle' class="login">
            <div class="item">
                <span class="label">用户:</span> 
                <el-input v-model.trim="data.user.username"  placeholder="请输入用户名"/></div>
            <div class="item">
                <span class="label">密码:</span> 
                <el-input v-model.trim="data.user.password" show-password placeholder="请输入密码"/></div>
            <div class="item">
                <el-button @Click="login" :disabled = "loginbuttondisable">登录</el-button>
                <el-button @click="l2r">注册</el-button></div>
            </div>
        <div :style='data.registerstyle' class="register">
            <div class="item">
                <span class="label">用户:</span>
                <el-input v-model.trim="data.user.username" placeholder="请输入用户名"/>
            </div>
            <div class="item">
                <span class="label">密码:</span>
                <el-input v-model.trim="data.user.password" show-password placeholder="请输入密码"/>
            </div>
            <div class="item">
                <span class="label">手机号码:</span>
                <el-input v-model.trim="data.user.phonenum"  placeholder="请输入手机号"/>
            </div>
            <div class="item" id="vfcode" :style="data.vfcode">
                <span class="label">验证码:</span>
                <el-input placeholder="验证码"></el-input>
                <el-button>发送验证码</el-button>
            </div>
            <div class="item">
                <span class="label">性别:</span> 
                <el-radio-group size="large"   v-model="data.user.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                    <el-radio label="保密">保密</el-radio>
                </el-radio-group>
            </div>
            <div class="item"><el-button @click="register" :disabled="registerbuttondisable">注册</el-button><el-button @click="r2l">取消</el-button></div>
        </div>
    </div>
</div>
</template>

<script>
import { onMounted, onUpdated, ref } from '@vue/runtime-core'
import {checkUser,checkPhoneNumber, baseAxios} from '@/lib/util'
export default {
    name:"LoginView",
    data(){
        return{
            loginbuttondisable:false,
            registerbuttondisable:false,
            loginboxstyle:null,
            responsedata:null
        }
    },
    props:{
        back:null
    },
    methods: {
        hide(){
            this.data.loginboxstyle={"display":"none"}
        },
        l2r(){
            this.data.title="注册"  
            var temp=this.data.loginstyle
            this.data.loginstyle = this.data.registerstyle
            this.data.registerstyle = temp
        },
        r2l(){
            this.data.title="登录"
            var temp=this.data.loginstyle
            this.data.loginstyle = this.data.registerstyle
            this.data.registerstyle = temp
        },
        login(){
            this.loginbuttondisable =true;
            let data = {'userName':this.data.user.username,'passwd':this.data.user.password}
            if(! checkUser(data)){
                this.loginbuttondisable = false
                return "falid"
            }
            this.baseAxios.post('/login',data)
            .then((response)=>{
                // alert(JSON.stringify(response.data))
                this.loginbuttondisable = false
                if(response.data.Logined)   
                {
                    this.responsedata = response.data   
                    this.back(this)
                }else{
                    alert(response.data)
                }             
            }).finally(()=>{
                this.loginbuttondisable=false
            }).catch((err) => {
              alert(err)  
            });
        },
        register(){ 
            this.registerbuttondisable = true
            let data = {
                'userName':this.data.user.username,
                'passwd':this.data.user.password,
                'gender':this.data.user.gender,
                'phonenum':this.data.user.phonenum}
            if(! checkUser(data)){
                this.registerbuttondisable = false
                return "faild"
            }else{
                this.registerbuttondisable=false
                if (! checkPhoneNumber(this.data.user.phonenum,this.data.country)){
                    return "faild phonenum"
                }
            }
            this.baseAxios.post('/register',data)
            .then((response)=>{
                this.registerbuttondisable = false
                console.log(response.data.Registed)
                if (response.data.Registed){
                    alert("注册成功！")
                    this.r2l()
                }else{
                    alert(JSON.stringify(response.data))
                }
                
            })
        },
    },
    setup() {
        baseAxios.defaults.headers.post['Content-Type'] = 'application/json'
        const data = ref({
            country:'CN',
            title:"登录",
            loginboxstyle:{
                "display":"block"
                },
            registerstyle:{
                'display':'none'
                },
            loginstyle:{
                'display':'block'
                },
            user:{
                username:"",
                password:"",
                gender:"",
                phonenum:"",
                image:"",
            },
            vfcode:{
                display:"none"
            }
        })
        onMounted(()=>{
            data.value.user.image=require("../assets/defaultuser/0.jpg")
            data.value.user.gender="保密"
            console.log(data.value.user.image)
        })
        return{
            data,
            baseAxios
        }
    }
}
</script>

<style scoped>
#loginpadding{
    padding-top: 10%;
}
.loginbox{
    max-width: 40%;
    height: 50%;
    margin:0  auto;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.55);
    background-repeat: no-repeat;
    transform: rotateY(180deg);
    background-size: 100%;
}   
.item{
    width: 80%;
    height: 50px;   
    display: block  ;
    margin: 0 auto;
    transform: rotateY(180deg);
}
.item div{
    width: 75%;
}
.item .label{
    width: 20%;
    display: inline-block;
}
.loginbox .title{
    text-align: left;
    display: block;
    transform: rotateY(180deg);
}
.imageavatar{
    text-align: center;
    /* margin-left: 60px; */
}
.el-radio__label{
    color: black;
}
.el-radio__input.is-checked + .el-radio__label{
    color: red;
}
#vfcode .el-input{
    width: 52%;
}
</style>
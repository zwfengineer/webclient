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
import axios from 'axios'
import {checkUser,checkPhoneNumber} from '@/lib/util'
export default {
    name:"LoginView",
    data(){
        return{
            loginbuttondisable:false,
            registerbuttondisable:false,
            loginboxstyle:null
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
            this.LoginAxios.post('/login',data)
            .then((response)=>{
                // alert(JSON.stringify(response.data))
                this.loginbuttondisable = false
                if(response.data.Logined)   
                {
                    this.back()
                }             
            })
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
            this.LoginAxios.post('/register',data)
            .then((response)=>{
                this.registerbuttondisable = false
                console.log(response.data.Registed)
                if (response.data.Registed){
                    this.r2l()
                }else{
                    alert(JSON.stringify(response.data))
                }
                
            })
        },
    },
    setup() {
        const LoginAxios = axios.create({baseURL:"http://localhost:1258"})
        LoginAxios.defaults.headers.post['Content-Type'] = 'application/json'
        LoginAxios.defaults.withCredentials = true;
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
                image:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            },
            vfcode:{
                display:"none"
            }
        })
        onMounted(()=>{
            data.value.user.image="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            data.value.user.gender="保密"
            console.log(data.value.user.image)
        })
        onUpdated(()=>{
            console.log(data.value.user.gender)
        })
        return{
            data,
            LoginAxios
        }
    }
}
</script>

<style>
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
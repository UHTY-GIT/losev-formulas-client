"use strict";(self["webpackChunkvue_losev_frontend"]=self["webpackChunkvue_losev_frontend"]||[]).push([[940],{1940:function(a,s,e){e.r(s),e.d(s,{default:function(){return V}});var i=e(3396),l=e(7139),t=e(9242);const r={class:"empty-layout"},d={class:"card-content"},n=(0,i._)("span",{class:"card-title"},"Увійти Losev Formulas",-1),o={class:"input-field"},v=(0,i._)("label",{for:"email"},"E-mail",-1),u={key:0,class:"helper-text invalid"},m={key:1,class:"helper-text invalid"},c={class:"input-field"},$=["type"],p=(0,i._)("label",{for:"password"},"Пароль",-1),w={key:0,class:"helper-text invalid"},g={key:1,class:"helper-text invalid"},y={class:"card-action"},h=(0,i._)("div",{class:"butt_login"},[(0,i._)("button",{class:"btn waves-effect waves-light auth-submit",type:"submit"}," Увійти ")],-1),_={class:"center under_butt_auth"};function f(a,s,e,f,k,b){const C=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",{class:(0,l.C_)(k.backgroundClass)},[(0,i._)("div",r,[(0,i._)("form",{class:"card auth-card",onSubmit:s[3]||(s[3]=(0,t.iM)(((...a)=>f.submitHandler&&f.submitHandler(...a)),["prevent"]))},[(0,i._)("div",d,[n,(0,i._)("div",o,[(0,i.wy)((0,i._)("input",{id:"email",type:"text","onUpdate:modelValue":s[0]||(s[0]=a=>f.email=a),class:(0,l.C_)({invalid:f.v$.email.$dirty&&f.v$.email.required.$invalid||f.v$.email.$dirty&&f.v$.email.email.$invalid,validate:f.v$.email.$dirty&&!f.v$.email.required.$invalid&&!f.v$.email.email.$invalid})},null,2),[[t.nr,f.email,void 0,{trim:!0}]]),v,f.v$.email.$dirty&&f.v$.email.required.$invalid?((0,i.wg)(),(0,i.iD)("small",u,"Поле E-mail не може бути пустим")):f.v$.email.$dirty&&f.v$.email.email.$invalid?((0,i.wg)(),(0,i.iD)("small",m,"Введіть коректний E-mail")):(0,i.kq)("",!0)]),(0,i._)("div",c,[(0,i.wy)((0,i._)("input",{id:"password",type:f.isPasswordVisible?"text":"password","onUpdate:modelValue":s[1]||(s[1]=a=>f.password=a),class:(0,l.C_)({invalid:f.v$.password.$dirty&&f.v$.password.required.$invalid||f.v$.password.$dirty&&!f.v$.password.minLength.$invalid,validate:f.v$.password.$dirty&&!f.v$.password.required.$invalid&&!f.v$.password.minLength.$invalid})},null,10,$),[[t.YZ,f.password,void 0,{trim:!0}]]),p,f.v$.password.$dirty&&f.v$.password.required.$invalid?((0,i.wg)(),(0,i.iD)("small",w,"Введіть пароль")):f.v$.password.$dirty&&f.v$.password.minLength.$invalid?((0,i.wg)(),(0,i.iD)("small",g,"Пароль повинен бути "+(0,l.zw)(f.v$.password.minLength.$params.min)+" символів. Зараз він "+(0,l.zw)(f.password.length),1)):(0,i.kq)("",!0),(0,i._)("i",{class:(0,l.C_)(["toggle-password",f.passwordIconClass]),onClick:s[2]||(s[2]=(...a)=>f.togglePassword&&f.togglePassword(...a))},null,2)])]),(0,i._)("div",y,[h,(0,i._)("p",_,[(0,i.Uk)(" Немає аккаунту? "),(0,i.Wm)(C,{to:"/register"},{default:(0,i.w5)((()=>[(0,i.Uk)("Зареєстурватися")])),_:1})])])],32)])],2)}e(7658);var k=e(4870),b=e(4219),C=e(5420),q=e(2483),H={logout:"Ви вийшли з аккаунту"},P=e(3258),x=e(5797),D=e.n(x),L={name:"loginPage",data(){return{backgroundClass:null}},setup(){const a=(0,k.iH)(""),s=(0,k.iH)(""),e=(0,q.tv)(),i=(0,b.ZP)(),l=async()=>{if(i.value.$invalid)return i.value.$touch(),void console.log("click to submitHandler");try{const i=await P.Z.loginUser(a.value,s.value);console.log(i.data.data.token),i.data&&i.data.data.token&&(localStorage.setItem("token",i.data.data.token),e.push("/"))}catch(l){l.response&&422===l.response.status?D().toast({html:"[Помилка]: Введено невірно логін або пароль"}):D().toast({html:`[Помилка]: ${l.message||"Невідома помилка"}`})}},t=(0,k.iH)(!1),r=(0,k.iH)("fas fa-eye-slash"),d=()=>{t.value=!t.value,t.value?r.value="fas fa-eye":r.value="fas fa-eye-slash"};return{v$:i,submitHandler:l,isPasswordVisible:t,togglePassword:d,passwordIconClass:r,email:a,password:s}},validations(){return{email:{required:C.C1,email:C.Do},password:{required:C.C1,minLength:(0,C.Ei)(6)}}},created(){this.backgroundClass=(0,i.f3)("backgroundClass")},mounted(){H[this.$route.query.message]&&this.$message(H[this.$route.query.message])}},U=e(89);const E=(0,U.Z)(L,[["render",f]]);var V=E}}]);
//# sourceMappingURL=940.5dab59e7.js.map
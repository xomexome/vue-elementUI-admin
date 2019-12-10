import axios from "axios";
var url = 'http://localhost:3000';
let $axios=axios.create({
    baseURL:url
})

//读取cookie
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null
    }
}

function $fetch(method,url,data){
    return new Promise((reslove,reject)=>{
        $axios({
            method,
            url,
            data:data,
            headers:{
                token:getCookie('token')
            }
        }).then((res)=>{
            let body=res.data;
            if(body.code == 200 || body.code == 201){
                reslove(body);
            }else{
                reject(body);
            }
        }).catch(err=>{
            reject(err);
        })
    })
}
import {Message} from 'element-ui'
export default (data)=>{
    console.log(data);
    //onError 拦截错误的方法 回调函数有err的 err有个属性response（响应）凡是err都有response
    data.$axios.onError(err=>{
        // console.log(err.response);
        const {statusCode,message}=err.response.data
        if(statusCode===400){
            Message.error(message)
        }
    })
}